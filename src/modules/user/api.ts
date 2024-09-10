import { AxiosPromise } from 'axios';

import config from '@/config';

import { http, storage } from '@/common/services';

import * as Types from './types';

export const Create = ({ values }: { values: Types.IForm.Create }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post(`users/add`, {
    ...values
  });

export const Single = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`/user/${id}`);

export const List = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/users', { params });

export const SearchList = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/users/search', { params });

export const FilterList = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/users/filter', { params });

export const ProfileFromMainLayout = (): AxiosPromise<Types.IApi.Profile.Response> =>
  http.request.get(`/api/user/v1/account/me`);

export const ProfileFromAuthLayout = (): AxiosPromise<Types.IApi.Profile.Response> =>
  http.pureRequest.get(`/api/user/v1/account/me`, {
    headers: {
      Authorization: `${storage.local.get(config.api.accessTokenKey)}`
    }
  });

export const Update = ({
  id,
  values
}: {
  id: string;
  values: Types.IForm.Update;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.put(`user/${id}`, {
    ...values
  });

export const Delete = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.delete(`/user/${id}`);

export const Logout = (): AxiosPromise<any> =>
  http.pureRequest.get(`/api/user/v1/token/logout`, {
    params: { accessToken: storage.local.get(config.api.accessTokenKey) }
  });
