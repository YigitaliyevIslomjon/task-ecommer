import React, { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import * as AuthModule from '@/modules/auth';

import Splash from '@/components/Splash';

import getRoutesData from './router';

const App: React.FC = () => {
  return (
    <AuthModule.Context.Provider>
      <Suspense fallback={<Splash />}>
        <ApplicationRouter />
      </Suspense>
    </AuthModule.Context.Provider>
  );
};

const ApplicationRouter = () => {
  const routes = getRoutesData();

  const router = useMemo(() => {
    return createBrowserRouter(routes);
  }, [routes]);

  return <RouterProvider router={router} />;
};

export default App;
