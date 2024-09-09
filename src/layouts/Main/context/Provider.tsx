import React, { useCallback, useState } from 'react';

import config from '@/config.ts';

import { storage } from '@/common/services';

import Context, { initialState } from './context';
import * as Types from './types';

type ChildrenType = (value: Types.Value) => React.ReactNode;

export interface IProps {
  children: React.ReactNode | ChildrenType;
}

const Provider: React.FC<IProps> = ({ children }) => {
  const [state, setState] = useState<Types.State>({ ...initialState });

  const setSidebarCollapsed = useCallback(
    (sidebarCollapsed: boolean) => {
      setState(state => ({ ...state, sidebarCollapsed }));
      storage.local.set(config.app.sidebarCollapsedKey, sidebarCollapsed);
    },
    [setState]
  );

  const setSidebarMobileCollapsed = useCallback(
    (sidebarMobileCollapsed: boolean) => {
      setState(state => ({ ...state, sidebarMobileCollapsed }));
      storage.local.set(config.app.sidebarMobileCollapsedKey, sidebarMobileCollapsed);
    },
    [state.sidebarMobileCollapsed, setState]
  );

  if (import.meta.env.DEV) console.log('MainLayoutContext => ', state);

  const value = {
    state,
    methods: {
      setSidebarCollapsed,
      setSidebarMobileCollapsed
    }
  };

  return (
    <Context.Provider value={value}>{typeof children === 'function' ? children(value) : children}</Context.Provider>
  );
};

export default Provider;
