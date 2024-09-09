import { useQuery } from '@tanstack/react-query';
import { get } from 'radash';

import * as Api from '../api.ts';
import * as Types from '../types.ts';

interface IProps {
  publishId: string;
}

const useCheckExecutor = ({ publishId }: IProps) => {
  const initialData = { isMainExecutor: false } as Types.IQuery.CheckExecutor;

  const { data = initialData, ...args } = useQuery<Types.IQuery.CheckExecutor, string, Types.IQuery.CheckExecutor>(
    ['auth/checkExecutor', publishId],
    async () => {
      const { data } = await Api.CheckExecutor({ publishId });

      return {
        isMainExecutor: !!get(data, 'data.isMainExecutor'),
        isAdditionalExecutor: !get(data, 'data.isMainExecutor')
      };
    },
    { initialData, enabled: !!publishId }
  );

  return { ...args, ...data };
};

export default useCheckExecutor;
