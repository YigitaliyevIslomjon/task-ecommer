import React, { useCallback, useState } from 'react';

import * as Types from '../types';

import Context, { initialState } from './context';

export interface IChildren extends Types.IContext.Props {
  children: React.ReactNode;
}

const Provider: React.FC<IChildren> = ({ children }) => {
  const [state, setState] = useState<Types.IContext.State>({ ...initialState });

  const setIsAuthenticated = useCallback(
    (isAuthenticated: boolean) => setState(state => ({ ...state, isAuthenticated })),
    [setState]
  );

  const setProfile = useCallback(
    (profile: Types.IEntity.Profile) => setState(state => ({ ...state, profile })),
    [setState]
  );

  const setTokens = useCallback(
    (tokens: Types.IEntity.Tokens) => setState(state => ({ ...state, tokens })),
    [setState]
  );

  const setIsFetched = useCallback((isFetched: boolean) => setState(state => ({ ...state, isFetched })), [setState]);

  return (
    <Context.Provider
      value={{
        methods: {
          setIsAuthenticated,
          setIsFetched,
          setProfile,
          setTokens
        },
        state
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
