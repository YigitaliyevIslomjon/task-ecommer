import { createContext } from 'react';

import config from '@/config';

import { storage } from '@/common/services';

import * as Types from '../types';

export const initialState: Types.IContext.State = {
  isAuthenticated: !!storage.local.get(config.api.accessTokenKey),
  isFetched: false,
  profile: {
    id: '1'
  },
  theme: storage.local.get('theme') || 'light',
  tokens: {
    accessToken: storage.local.get(config.api.accessTokenKey) || '',
    refreshToken: storage.local.get(config.api.refreshTokenKey) || ''
  }
};

const context = createContext<Types.IContext.Value>({
  methods: {
    setIsAuthenticated: () => {},
    setIsFetched: () => {},
    setProfile: () => {},
    setTheme: () => {},
    setTokens: () => {}
  },
  state: initialState
});

export default context;
