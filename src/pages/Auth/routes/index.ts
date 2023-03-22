import { lazy } from 'react';

const PATH = '/user';

const HOME_PATH = '/device/rsu';

const routes = [
  {
    path: '/',
    redirect: HOME_PATH,
  },
  {
    path: PATH,
    component: lazy(
      () => import(/* webpackChunkName: "login",webpackPrefetch: true */ '#/layouts/BlankLayout'),
    ),
    children: [
      {
        path: `${PATH}/login`,
        name: 'login',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "login",webpackPrefetch: true */ '#/pages/Auth/containers/Login'
            ),
        ),
      },
    ],
  },
];

export default routes;
