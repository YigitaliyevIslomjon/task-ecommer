import React, { ReactNode } from 'react';

import Splash from '@/components/Splash';

import { useContext } from '../context';
import { useProfile } from '../hooks';

interface IProps {
  children: ReactNode;
}

const CheckAuth: React.FC<IProps> = ({ children }) => {
  const { state } = useContext();

  useProfile();

  if (!state.isFetched) {
    return <Splash />;
  }

  return children;
};

export default CheckAuth;
