import { get } from 'radash';

import type * as Types from './types';

export const Profile = (item?: Types.IApi.Profile.Response): Types.IEntity.Profile => {
  return {
    id: get(item, 'id') || '',
    username: get(item, 'username') || '',
    email: get(item, 'email') || '',
    firstName: get(item, 'firstName') || '',
    lastName: get(item, 'lastName') || '',
    gender: get(item, 'gender') || '',
    image: get(item, 'image') || '',
    accessToken: get(item, 'token') || '',
    refreshToken: get(item, 'refreshToken') || ''
  };
};
