import { useMemo } from 'react';

import buildProfileGrantsContext from '@/modules/accessManager/buildProfileGrantsContext';
import { useAuth } from '@/modules/auth/hooks';

import { allMenuItems } from '@/layouts/Main/components/Sidebar/menu';

import * as Utils from '../router/conditionals';

const useMenuItems = () => {
  const { profile } = useAuth();

  const accessibleMenuItems = useMemo(() => {
    const context = buildProfileGrantsContext({ profile });

    return Utils.getAccessibleMenuItems({ menuItems: allMenuItems, context });
  }, [profile]);

  return accessibleMenuItems;
};

export default useMenuItems;
