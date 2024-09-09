import { get } from 'radash';

import type * as Types from './types';

export const Profile = (item?: Types.IApi.Profile.Response): Types.IEntity.Profile => {
  return {
    id: get(item, 'id') || ''
  };
};

export const Select = (item: any): Types.IEntity.Select => ({
  code: get(item, 'code') || '',
  name: get(item, 'name') || ''
});

export const Role = (item: any): Types.IEntity.Role => ({
  id: get(item, 'id') || '',
  name: get(item, 'name') || '',
  permissions: get(item, 'permissions') || []
});

export const Account = (item?: any): Types.IEntity.Account => ({
  success: !!get(item, 'success'),
  tokens: {
    accessToken: get(item, 'accessToken') || '',
    refreshToken: get(item, 'refreshToken') || ''
  },
  profile: Profile(get(item, 'accountResponse'))
});

export const Login = (item?: any): Types.IEntity.Login => ({
  multipleOrg: get(item, 'data', []).length > 1,
  accounts: get(item, 'data', []).map((account: any) => Account(account))
});

export const AdditionalRole = (item?: any): Types.IEntity.AdditionalRole => ({
  code: get(item, 'code'),
  name: get(item, 'name'),
  roleGroup: get(item, 'roleGroup')
});
