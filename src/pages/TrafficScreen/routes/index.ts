import { lazy } from 'react';

const PATH = '/traffic';

const routes = [
  {
    path: PATH,
    redirect: `${PATH}/map?type=1`,
  },
  {
    path: PATH,
    breadcrumbName: 'Traffic screen',
    component: lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: `${PATH}/map`,
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "center_map",webpackPrefetch: true */ '#/pages/TrafficScreen/containers/IntersectionMap'
            ),
        ),
      },
    ],
  },
];

export default routes;
