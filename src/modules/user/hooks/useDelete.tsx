import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api.ts';
import * as Mappers from '../mappers.ts';
import * as Types from '../types.ts';

const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<Types.IEntity.User, string, Types.IQuery.Delete, any>(
    async ({ id }) => {
      const { data } = await Api.Delete({ id });

      return Mappers.User(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'user' && query.queryKey[1] === 'list'
        });
      }
    }
  );
};

export default useDelete;
