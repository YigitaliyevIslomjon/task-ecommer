import { useMemo } from 'react';

import getRoutesData from '@/router';

const useRoutes = () => {
  const accessibleRoutes = useMemo(() => {
    return getRoutesData();
  }, []);

  return accessibleRoutes;
};

export default useRoutes;
