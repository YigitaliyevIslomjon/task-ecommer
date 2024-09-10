import { createContext } from 'react';

import config from '@/config';

import * as Mappers from '../mappers';
import * as Types from '../types';

import { storage } from '@/services';

export const initialState: Types.IContext.State = {
  isAuthenticated: !!storage.local.get(config.api.accessTokenKey),
  isFetched: false,
  profile: Mappers.Profile(),
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
    setTokens: () => {}
  },
  state: initialState
});

export default context;
