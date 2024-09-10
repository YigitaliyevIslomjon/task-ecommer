import { AxiosPromise } from 'axios';

import * as Types from './types';

import { http } from '@/services';

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
