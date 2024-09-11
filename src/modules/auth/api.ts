import { AxiosPromise } from 'axios';

import config from '@/config';

import * as Types from './types';

import { http, storage } from '@/services';

export const Login = ({ username, password }: { username: string; password: string }): AxiosPromise<any> =>
  http.pureRequest.post(`/auth/login`, {
    username,
    password,
    expiresInMins: 30
  });

export const ProfileFromMainLayout = (): AxiosPromise<Types.IApi.Profile.Response> => http.request.get(`/user/me`);

export const ProfileFromAuthLayout = (): AxiosPromise<Types.IApi.Profile.Response> =>
  http.pureRequest.get(`/user/me`, {
    headers: {
      Authorization: `${storage.local.get(config.api.accessTokenKey)}`
    }
  });
