import { get } from 'radash';

import config from '@/config';

import * as Types from './types';

export const Meta = (item?: Types.IApi.Meta): Types.IEntity.Meta => ({
  current: Number(get(item, 'number')) ? Number(get(item, 'number')) + 1 : 1,
  perPage: get(item, 'size') || config.list.perPage,
  totalItems: get(item, 'totalElements') || 0,
  totalPages: get(item, 'totalPages') || 0
});

export const Params = (params?: any): Types.IEntity.Params => ({
  filter: get(params, 'filter') || {},
  page: get(params, 'page') || 1,
  perPage: get(params, 'perPage') || config.list.perPage,
  sort: {
    direction: get(params, 'sort.direction'),
    key: get(params, 'sort.key')
  }
});
export const Param = (params?: any): Types.IEntity.Params => ({
  sort: {
    direction: get(params, 'sort.direction') || 'asc',
    key: get(params, 'sort.key') || 'id'
  }
});

export const Request = (params?: Types.IEntity.Params): Types.IApi.Request => {
  return {
    ...params?.filter,
    orderBy: params?.sort?.key || undefined,
    page: Number(params?.page) && Number(params?.page) > 0 ? Number(params?.page) - 1 : 0,
    size: Number(params?.perPage) && Number(params?.perPage) > 0 ? Number(params?.perPage) : config.list.perPage,
    sortOrder: ['asc', 'desc'].includes(params?.sort?.direction as string)
      ? (params?.sort?.direction as 'desc')
      : undefined
  };
};
