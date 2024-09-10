import { type RouteObject } from 'react-router-dom';
import queryString from 'query-string';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import * as AuthModule from '@/modules/auth';

import * as Layouts from '@/layouts';

import Auth from '@/pages/Auth';
import PostPage from '@/pages/Post';
import ProductPage from '@/pages/Product';
import TodoPage from '@/pages/Todo';
import UserPage from '@/pages/User';

const getRoutesData = (): RouteObject[] => [
  {
    path: '/auth',
    element: (
      <AuthModule.Containers.CheckAuth>
        <Auth />
      </AuthModule.Containers.CheckAuth>
    )
  },
  {
    path: '/',
    element: (
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: queryString.parse,
          objectToSearchString: queryString.stringify
        }}
      >
        <AuthModule.Containers.CheckAuthMain>
          <Layouts.Main />
        </AuthModule.Containers.CheckAuthMain>
      </QueryParamProvider>
    ),
    children: [
      {
        path: 'user',
        element: <UserPage />
      },
      {
        path: 'post',
        element: <PostPage />
      },
      {
        path: 'product',
        element: <ProductPage />
      },
      {
        path: 'todos',
        element: <TodoPage />
      },
      {
        path: '/*',
        element: <div>not found page</div>
      }
    ]
  }
];

export default getRoutesData;
