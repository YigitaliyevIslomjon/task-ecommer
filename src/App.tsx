import React, { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import * as AccessManager from '@/modules/accessManager';
import * as AuthModule from '@/modules/auth';

import Splash from '@/components/Splash';

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
  const routes = AccessManager.Hooks.useRoutes();

  const router = useMemo(() => {
    return createBrowserRouter(routes);
  }, [routes]);

  return <RouterProvider router={router} />;
};

export default App;
