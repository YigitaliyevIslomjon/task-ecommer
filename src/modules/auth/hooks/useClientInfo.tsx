import { useMutation } from '@tanstack/react-query';
import { get } from 'radash';

import * as Api from '../api.ts';
import * as Types from '../types.ts';

const useClientInfo = () => {
  return useMutation<Types.IEntity.ClientInfo, string, Types.IMutation.ClientInfo, any>(
    async () => {
      const { data } = await Api.ClientInfo({ callbackUrl: `${import.meta.env.VITE_SITE_URL}/auth` });

      return {
        url: get(data, 'data.url') || ''
      };
    },
    {
      onSuccess: ({ url }) => {
        window.open(url, '_self');
      }
    }
  );
};

export default useClientInfo;
