import { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import * as Types from './types';

export const Create = ({
  values,
  userId
}: {
  values: Types.IForm.Create;
  userId: string;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post(`posts/add`, {
    ...values,
    userId
  });

export const Single = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`/post/${id}`);

export const List = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/posts', { params });

export const SearchList = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/posts/search', { params });

export const Update = ({
  id,
  values
}: {
  id: string;
  values: Types.IForm.Update;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.put(`/post/${id}`, {
    ...values
  });

export const Delete = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.delete(`/post/${id}`);
