import 'whatwg-fetch';
import { NotFoundError, UnauthorizedError } from './Errors';
import uuid from 'uuid/v4';

// TODO: MAKE THIS AN ENV VAR
const WS_ROOT = 'http://localhost:3001';

const buildHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = sessionStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const buildFetchOptions = (method, headers, content) => {
  let fetchOptions = { method, headers };
  if (content) {
    fetchOptions.body = JSON.stringify(content);
  }
  return fetchOptions;
};

const throwForKnownErrors = (resp) => {
  if (resp.status === 401) {
    throw new UnauthorizedError();
  } else if (resp.status === 404) {
    throw new NotFoundError();
  }
};

const getData = async (resp) => {
  const json = await resp.text();
  return json ? JSON.parse(json) : undefined;
};

const buildErrors = (resp, data) => {
  if (!resp.ok && data) {
    return Object.keys(data).reduce((acc, k) => {
      // noinspection JSUnresolvedVariable
      acc[k] = data[k].messages[0]; // only takes the first on purpose
      return acc;
    }, {});
  }
  return undefined;
};

const call = async (method, path, content) => {
  const headers = buildHeaders();
  const fetchOptions = buildFetchOptions(method, headers, content);
  // noinspection JSCheckFunctionSignatures
  const resp = await fetch(`${WS_ROOT}${path}`, fetchOptions);
  throwForKnownErrors(resp);
  const data = await getData(resp);
  const errors = buildErrors(resp, data);
  return { data, errors };
};

// TODO: DRY UP MANY OF THE METHODS BELOW

const API = {

  async isAuthenticated() {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  async register(fields) {
    const { email, password } = fields;
    return await call('POST', '/user', { email, password });
  },

  async confirm(fields) {
    const { email, confirmationCode } = fields;
    return await call('POST', '/user/confirm', { email, confirmationCode });
  },

  async authenticate(fields) {
    const { email, password } = fields;
    const result = await call('POST', '/user/login', { email, password });
    if (!result.errors) {
      const { token } = result.data;
      sessionStorage.setItem('token', token);
    }
    return result;
  },

  signout() {
    sessionStorage.removeItem('token');
  },

  async findProjects() {
    return await call('GET', '/projects', null);
  },

  async findProjectById(id) {
    return await call('GET', '/projects/'+id, null);
  },

  async findProjectByIdWithDetails(id) {
    return Promise.all([
      API.findProjectById(id),
      API.findReleasesByProjectId(id),
      API.findBacklogsByProjectId(id)
    ]);
  },

  async createProject(fields) {
    const { name, company } = fields;
    return await call('POST', '/projects', { name, company });
  },

  async updateProject(fields) {
    const { id, name, company } = fields;
    return await call('PATCH', '/projects/'+id, { name, company });
  },

  async createRelease(fields) {
    const { projectId, name, notes } = fields;
    return await call('POST', '/releases', { projectId, name, notes });
  },

  async updateRelease(fields) {
    const { id, name, notes } = fields;
    return await call('PATCH', '/releases/'+id, { name, notes });
  },

  async findReleaseByIdWithDetails(id) {
    // noinspection JSCheckFunctionSignatures
    const [releaseResp, iterationsResp] = await Promise.all([API.findReleaseById(id), API.findIterationsByReleaseId(id)]);
    const projectResp = await API.findProjectById(releaseResp.data.projectId);
    return Promise.resolve([releaseResp, iterationsResp, projectResp]);
  },

  async findReleaseById(id) {
    return await call('GET', `/releases/${id}`, null);
  },

  async findReleasesByProjectId(projectId) {
    return await call('GET', `/releases?projectId=${projectId}`, null);
  },

  async deleteReleaseById(id) {
    return await call('DELETE', `/releases/${id}`, null);
  },

  async findBacklogsByProjectId(projectId) {
    return await call('GET', `/backlogs?projectId=${projectId}`, null);
  },

  async createIteration(fields) {
    const { releaseId, name, notes } = fields;
    return await call('POST', '/iterations', { releaseId, name, notes });
  },

  async updateIteration(fields) {
    const { id, name, notes } = fields;
    return await call('PATCH', `/iterations/${id}`, { name, notes });
  },

  async findIterationById(id) {
    return await call('GET', `/iterations/${id}`, null);
  },

  async findIterationsByReleaseId(releaseId) {
    return await call('GET', `/iterations?releaseId=${releaseId}`, null);
  },

  async deleteIterationById(id) {
    return await call('DELETE', `/iterations/${id}`, null);
  },

  async findIterationByIdWithDetails(id) {
    const iterationResp = await API.findIterationById(id);
    const releaseResp = await API.findReleaseById(iterationResp.data.releaseId);
    const projectResp = await API.findProjectById(releaseResp.data.projectId);
    const storiesResp = await API.findStoriesByIterationId(id);
    return Promise.resolve([iterationResp, releaseResp, projectResp, storiesResp]);
  },

  async createStory(fields) {
    return await call('POST', '/stories', fields);
  },

  async updateStory(fields) {
    const { id, iterationId, backlogId, title, points, notes } = fields;
    return await call('PATCH', `/stories/${id}`, { iterationId, backlogId, title, points, notes });
  },

  async findStoriesByIterationId(iterationId) {
    return await call('GET', `/stories?iterationId=${iterationId}`, null);
  },

  async findStoryById(id) {
    return await call('GET', `/stories/${id}`, null);
  },

  async deleteStoryById(id) {
    return await call('DELETE', `/stories/${id}`, null);
  },

  async createTask(fields) {
    const { storyId, ...task } = fields;
    const storyResp = await this.findStoryById(storyId);
    const { data: story } = storyResp;
    const tasks = (story.tasks || []);
    task.id = uuid();
    task.state = 0;
    tasks.push(task);
    return await call('PATCH', `/stories/${storyId}`, { tasks });
  },

  async updateTask(fields) {
    const { storyId, id, ...doc } = fields;
    const storyResp = await this.findStoryById(storyId);
    const { data: story } = storyResp;
    const tasks = (story.tasks || []);
    const existingTaskIndex = tasks.findIndex(task => task.id === id);
    tasks[existingTaskIndex] = Object.assign(tasks[existingTaskIndex], doc);
    return await call('PATCH', `/stories/${storyId}`, { tasks });
  },

  async findTaskById(storyId, id) {
    const storyResp = await this.findStoryById(storyId);
    const { data: story } = storyResp;
    const task = (story.tasks || []).find(task => task.id === id);
    return { data: task };
  },

};

export default API;
