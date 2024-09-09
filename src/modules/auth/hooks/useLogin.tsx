import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { StringParam, useQueryParams } from 'use-query-params';

import config from '@/config.ts';

import { storage } from '@/common/services';

import * as Api from '../api.ts';
import * as Context from '../context';
import * as Mappers from '../mappers.ts';
import * as Types from '../types.ts';

interface IProps {}

const useLogin = ({}: IProps = {}) => {
  const initialData = { item: Mappers.Login() } as Types.IQuery.Login;

  const navigate = useNavigate();

  const [query, setQuery] = useQueryParams({
    code: StringParam,
    state: StringParam
  });

  const code = query.code || '';
  const state = query.state || '';

  const { methods } = Context.useContext();
  const { data = initialData, ...args } = useQuery<Types.IQuery.Login, string, Types.IQuery.Login>(
    ['auth', 'login'],
    async () => {
      const { data } = await Api.Login({ state, code });

      return {
        item: Mappers.Login(data)
      };
    },
    {
      initialData,
      enabled: !!code && !!state,
      onSuccess: ({ item }) => {
        if (!item.multipleOrg && item.accounts.length === 1) {
          setQuery({}, 'replace');

          const account = item.accounts[0];

          if (!account.success) {
            message.warning('Ruxsat berilmadi! Ushbu operatsiyani amalga oshirish uchun ruxsat berilmagan!');
            return;
          }

          storage.local.set(config.api.accessTokenKey, account.tokens.accessToken);
          storage.local.set(config.api.refreshTokenKey, account.tokens.refreshToken);

          methods.setIsAuthenticated(true);
          methods.setTokens(account.tokens);
          navigate('/');
        } else {
          navigate('/auth/organization-select');
        }
      },
      onError: error => {
        console.log(error);
      }
    }
  );

  return { ...args, ...data };
};

export default useLogin;
