import { useNavigate } from 'react-router-dom';

import config from '@/config';

import { storage } from '@/common/services';

import * as Api from '../api';
import { useContext } from '../context';

interface IReturn {
  logout: () => void;
}

const useLogout = (): IReturn => {
  const { methods } = useContext();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Api.Logout();
    } catch (error) {
      if (import.meta.env.DEV) console.log('logout error => ', error);
    } finally {
      methods.setIsAuthenticated(false);

      methods.setTokens({ accessToken: '', refreshToken: '' });

      storage.local.remove(config.api.accessTokenKey);
      storage.local.remove(config.api.refreshTokenKey);

      navigate('/auth');
    }
  };

  return { logout };
};

export default useLogout;
