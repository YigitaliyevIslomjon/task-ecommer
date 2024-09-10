import { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import * as Types from './types';

export const Create = ({ values }: { values: Types.IForm.Create }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.post(`/products/add`, {
    ...values
  });

export const Single = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`/products/${id}`);

export const List = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/products', { params });

export const SearchList = ({ params }: { params: Types.IApi.List.Params }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('/products/search', { params });

export const Update = ({
  id,
  values
}: {
  id: string;
  values: Types.IForm.Update;
}): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.put(`/products/${id}`, {
    ...values
  });

export const Delete = ({ id }: { id: string }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.delete(`/products/${id}`);
