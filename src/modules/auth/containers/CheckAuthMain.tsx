import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '@/config';

import Splash from '@/components/Splash';

import { useContext } from '../context';
import { useProfile } from '../hooks';

import { storage } from '@/services';

interface IProps {
  children: ReactNode;
}

const CheckAuthMain: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();

  const { state } = useContext();
  const accessToken = storage.local.get(config.api.accessTokenKey) || '';
  if (!accessToken) {
    navigate('/auth');
  }

  useProfile();

  if (!state.isFetched) {
    return <Splash />;
  }

  return children;
};

export default CheckAuthMain;
