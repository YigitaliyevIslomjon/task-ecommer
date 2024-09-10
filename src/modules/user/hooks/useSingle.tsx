import { useQuery } from '@tanstack/react-query';

import * as Api from '../api.ts';
import * as Mappers from '../mappers.ts';
import * as Types from '../types.ts';

interface IProps {
  id: string;
  onSuccess?: (data: any) => void;
}

const useSingle = ({ id, onSuccess }: IProps) => {
  const initialData = { item: Mappers.User() } as Types.IQuery.Single;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Single, string, Types.IQuery.Single>(
    ['user', 'single', id],
    async () => {
      const { data } = await Api.Single({ id });
      return {
        item: Mappers.User(data)
      };
    },
    {
      initialData,
      enabled: !!id,
      onSuccess
    }
  );

  return { ...args, ...data };
};

export default useSingle;
