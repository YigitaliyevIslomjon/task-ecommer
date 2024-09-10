import { type RouteObject } from 'react-router-dom';
import queryString from 'query-string';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import * as AuthModule from '@/modules/auth';

import * as Layouts from '@/layouts';

import Auth from '@/pages/Auth';

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
        async lazy() {
          const UserPage = await import('@/pages/User');
          return { Component: UserPage.default };
        }
      },
      {
        path: 'post',
        async lazy() {
          const PostPage = await import('@/pages/Post');
          return { Component: PostPage.default };
        }
      },
      {
        path: 'product',
        async lazy() {
          const ProductPage = await import('@/pages/Product');
          return { Component: ProductPage.default };
        }
      },
      {
        path: 'todos',
        async lazy() {
          const TodoPage = await import('@/pages/Todo');
          return { Component: TodoPage.default };
        }
      },
      {
        path: '/*',
        element: <div>not found page</div>
      }
    ]
  }
];

export default getRoutesData;
