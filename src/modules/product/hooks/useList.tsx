import { useQuery } from '@tanstack/react-query';
import get from 'lodash/get';

import * as Api from '../api';
import * as Constants from '../constants';
import * as Mappers from '../mappers';
import * as Types from '../types';

interface IProps {
  params?: Types.IApi.List.Params;
}

const useList = ({ params }: IProps = {}) => {
  const initialData = { items: [], meta: Mappers.Meta() } as Types.IQuery.List;
  const paramsWithDefaults = {
    skip: params?.skip || 1,
    limit: params?.limit || 10,
    sortBy: params?.sortBy,
    order: params?.order,
    q: params?.q
  };

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>(
    [Constants.LIST, paramsWithDefaults],
    async () => {
      let data;
      // search qilinganda ishlaydi
      if (paramsWithDefaults.q) {
        const response = await Api.SearchList({
          params: paramsWithDefaults
        });
        data = response.data;
        // filter qilinganda ishaydi
      } else {
        const response = await Api.List({
          params: paramsWithDefaults
        });
        data = response.data;
      }

      const items = (get(data, 'products') || []).reduce((prev, item) => [...prev, Mappers.Product(item)], []);
      const meta = Mappers.Meta(get(data, 'meta'));

      return {
        items,
        meta
      };
    },
    { initialData, keepPreviousData: true }
  );

  return { ...args, ...data };
};

export default useList;
