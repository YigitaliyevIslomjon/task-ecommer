import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { get } from 'radash';

import config from '@/config';

import storage from './storage';

const pureHttp = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(axiosConfig => {
  const accessToken = storage.local.get(config.api.accessTokenKey) || '';

  if (accessToken) {
    axiosConfig.headers.Authorization = `${accessToken}`;
  }

  return axiosConfig;
});

const refreshToken = async () => {
  const refreshToken = storage.local.get(config.api.refreshTokenKey) || '';

  try {
    const { data } = await pureHttp.post(`/auth/refresh`, undefined, {
      params: {
        refreshToken
      }
    });

    storage.local.set(config.api.accessTokenKey, get(data, 'data.token'));
    storage.local.set(config.api.refreshTokenKey, get(data, 'data.refreshToken'));
  } catch (error) {
    storage.local.remove(config.api.accessTokenKey);
    storage.local.remove(config.api.refreshTokenKey);

    window.location.href = '/auth';

    throw error;
  }
};

createAuthRefreshInterceptor(http, refreshToken);

export default { pureRequest: pureHttp, request: http };
