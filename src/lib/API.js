import 'whatwg-fetch';
import { UnauthorizedError } from './Errors';

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

  async createProject(fields) {
    const token = sessionStorage.getItem('token');
    const { name, company } = fields;
    return await call('POST', '/projects', { name, company }, token);
  },

};

export default API;
