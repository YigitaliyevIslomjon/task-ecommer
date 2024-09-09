import { useQuery } from '@tanstack/react-query';
import { get, objectify } from 'radash';

import { ServiceType } from '@/config.ts';

import * as Api from '../api.ts';
import * as Constants from '../constants.ts';
import * as Mappers from '../mappers.ts';
import * as Types from '../types.ts';

interface IProps {
  projectPublishId: string;
  type?: Constants.BUTTON_TYPE;
  serviceName: ServiceType;
}

const useCanActions = ({ projectPublishId, type = Constants.BUTTON_TYPE.EXTERNAL, serviceName }: IProps) => {
  const initialData = { items: {} } as Types.IQuery.CanActions;

  const { data = initialData, ...args } = useQuery<Types.IQuery.CanActions, string, Types.IQuery.CanActions>(
    ['auth/canActions', projectPublishId, serviceName],
    async () => {
      const { data } = await Api.CanActions({ projectPublishId, type, serviceName });

      const items = (get(data, 'data', []) || []).map(item => Mappers.Select(item));
      return {
        items: objectify(items, item => item.code)
      };
    },
    { initialData, enabled: !!projectPublishId }
  );

  return { ...args, ...data };
};

export default useCanActions;
