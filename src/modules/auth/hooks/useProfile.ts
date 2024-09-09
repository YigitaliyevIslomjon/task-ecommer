import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import { useContext } from '../context';
import * as Mappers from '../mappers';
import * as Types from '../types';

interface IProps {}

const useProfile = ({}: IProps = {}) => {
  const { methods, state } = useContext();

  return useQuery<Types.IEntity.Profile, string, Types.IEntity.Profile>(
    ['auth', 'profile', state.tokens.accessToken],
    async () => {
      let response: any;

      if (!state.tokens.accessToken) {
        response = await Api.ProfileFromAuthLayout();
      } else {
        response = await Api.ProfileFromMainLayout();
      }

      return Mappers.Profile(response?.data?.data);
    },
    {
      meta: {
        customErrorHandling: true
      },
      onSettled: () => {
        methods.setIsFetched(true);
      },
      onSuccess: data => {
        methods.setProfile(data);
        methods.setIsAuthenticated(true);
      },
      retry: false
    }
  );
};

export default useProfile;
