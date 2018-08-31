import 'whatwg-fetch';
import { NotFoundError, UnauthorizedError } from './Errors';

const WS_ROOT = 'http://localhost:3001';

const call = async (method, path, content, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let fetchOptions = { method, headers };
  if (content) {
    fetchOptions.body = JSON.stringify(content);
  }
  const resp = await fetch(`${WS_ROOT}${path}`, fetchOptions);
  if (resp.status === 401) {
    throw new UnauthorizedError();
  } else if (resp.status === 404) {
    throw new NotFoundError();
  }
  const json = await resp.text();
  let data = json ? JSON.parse(json) : undefined;
  if (resp.ok) {
    return { data };
  } else {
    if (data) {
      const errors = Object.keys(data).reduce((acc, k) => {
        // noinspection JSUnresolvedVariable
        acc[k] = data[k].messages[0];
        return acc;
      }, {});
      return { errors };
    }
    return {};
  }
};

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
    const token = sessionStorage.getItem('token');
    return await call('GET', '/projects', null, token);
  },

  async findProjectById(id) {
    const token = sessionStorage.getItem('token');
    return await call('GET', '/projects/'+id, null, token);
  },

  async findProjectByIdWithReleases(id) {
    return Promise.all([
      API.findProjectById(id),
      API.findReleasesByProjectId(id)
    ]);
  },

  async createProject(fields) {
    const token = sessionStorage.getItem('token');
    const { name, company } = fields;
    return await call('POST', '/projects', { name, company }, token);
  },

  async updateProject(fields) {
    const token = sessionStorage.getItem('token');
    const { id, name, company } = fields;
    return await call('PATCH', '/projects/'+id, { name, company }, token);
  },

  async createRelease(fields) {
    const token = sessionStorage.getItem('token');
    const { projectId, name, notes } = fields;
    return await call('POST', '/releases', { projectId, name, notes }, token);
  },

  async updateRelease(fields) {
    const token = sessionStorage.getItem('token');
    const { id, name, notes } = fields;
    return await call('PATCH', '/releases/'+id, { name, notes }, token);
  },

  async findReleaseByIdWithIterations(id) {
    return Promise.all([
      API.findReleaseById(id),
      API.findIterationsByReleaseId(id)
    ]);
  },

  async findReleaseById(id) {
    const token = sessionStorage.getItem('token');
    return await call('GET', `/releases/${id}`, null, token);
  },

  async findReleasesByProjectId(projectId) {
    const token = sessionStorage.getItem('token');
    return await call('GET', `/releases?projectId=${projectId}`, null, token);
  },

  async deleteReleaseById(id) {
    const token = sessionStorage.getItem('token');
    return await call('DELETE', `/releases/${id}`, null, token);
  },

  async createIteration(fields) {
    const token = sessionStorage.getItem('token');
    const { releaseId, name, notes } = fields;
    return await call('POST', '/iterations', { releaseId, name, notes }, token);
  },

  async updateIteration(fields) {
    const token = sessionStorage.getItem('token');
    const { id, name, notes } = fields;
    return await call('PATCH', `/iterations/${id}`, { name, notes }, token);
  },

  async findIterationById(id) {
    const token = sessionStorage.getItem('token');
    return await call('GET', `/iterations/${id}`, null, token);
  },

  async findIterationsByReleaseId(releaseId) {
    const token = sessionStorage.getItem('token');
    return await call('GET', `/iterations?releaseId=${releaseId}`, null, token);
  },

  async deleteIterationById(id) {
    const token = sessionStorage.getItem('token');
    return await call('DELETE', `/iterations/${id}`, null, token);
  },

};

export default API;
