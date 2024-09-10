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
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: queryString.parse,
          objectToSearchString: queryString.stringify
        }}
      >
        <AuthModule.Containers.Auth>
          <Layouts.Auth />
        </AuthModule.Containers.Auth>
      </QueryParamProvider>
    ),
    children: [
      {
        index: true,
        element: <Auth />
      }
    ]
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
        <Layouts.Main />
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
      }
    ]
  }
];

export default getRoutesData;
