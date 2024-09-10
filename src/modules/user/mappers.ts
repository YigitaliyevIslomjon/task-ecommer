import { get } from 'radash';

import type * as Types from './types';

export const User = (item?: any): Types.IEntity.User => ({
  id: get(item, 'id') || '',
  firstName: get(item, 'firstName') || '',
  lastName: get(item, 'lastName') || '',
  age: get(item, 'age') || 0,
  gender: get(item, 'gender') || '',
  email: get(item, 'email') || '',
  phone: get(item, 'phone') || '',
  username: get(item, 'username') || '',
  password: get(item, 'password') || '',
  image: get(item, 'image') || '',
  bloodGroup: get(item, 'bloodGroup') || '',
  height: get(item, 'height') || 0,
  weight: get(item, 'weight') || 0,
  eyeColor: get(item, 'eyeColor') || ''
});

export const Meta = (item?: any): Types.IEntity.Meta => ({
  total: get(item, 'total') || 0,
  skip: get(item, 'skip') || 1,
  limit: get(item, 'limit')
});
