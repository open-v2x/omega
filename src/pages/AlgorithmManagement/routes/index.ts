import { lazy } from 'react';

const PATH = '/algorithm';

const routes = [
  {
    path: PATH,
    redirect: `${PATH}/config`,
  },
  {
    path: PATH,
    breadcrumbName: 'Algorithm Management',
    component: lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: `${PATH}/config`,
        breadcrumbName: 'Algorithm Config',
        component: lazy(() => import('#/pages/AlgorithmManagement/containers/Config')),
      },
      {
        path: `${PATH}/version`,
        breadcrumbName: 'Algorithm Version',
        component: lazy(() => import('#/pages/AlgorithmManagement/containers/Version')),
      },
      {
        path: `${PATH}/service`,
        breadcrumbName: 'Algorithm Service',
        component: lazy(() => import('#/pages/AlgorithmManagement/containers/Service')),
      },
    ],
  },
];

export default routes;
