import { lazy } from 'react';
const PATH = '/system';

const routes = [
  {
    path: PATH,
    component: lazy(() => import('#/layouts/SiderLayout')),
    breadcrumbName: 'System',
    hideInMenu: true,
    layout: true,
    auth: true,
    children: [
      {
        path: `${PATH}/edgeSiteConfig`,
        breadcrumbName: 'Site Config',
        component: lazy(() => import('#/pages/System/containers/SiteConfig/List')),
      },
      {
        path: `${PATH}/edgeSiteConfig/details/:id`,
        breadcrumbName: 'Edge Site Detail',
        component: lazy(() => import('#/pages/System/containers/SiteConfig/Detail')),
      },
    ],
  },
];

export default routes;
