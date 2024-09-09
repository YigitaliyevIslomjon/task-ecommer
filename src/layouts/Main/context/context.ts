import { createContext } from 'react';

import config from '@/config';

import { storage } from '@/common/services';

import * as Types from './types';

export const initialState: Types.State = {
  sidebarCollapsed: !!storage.local.get(config.app.sidebarCollapsedKey),
  sidebarMobileCollapsed: !!storage.local.get(config.app.sidebarMobileCollapsedKey)
};

const context = createContext<Types.Value>({
  methods: {
    setSidebarCollapsed: () => {},
    setSidebarMobileCollapsed: () => {}
  },
  state: initialState
});

export default context;
