import React from 'react';
const routes = [
  {
    path: '/user',
    component: React.lazy(
      () => import(/* webpackChunkName: "login",webpackPrefetch: true */ '#/layouts/BlankLayout'),
    ),
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: React.lazy(
          () => import(/* webpackChunkName: "login",webpackPrefetch: true */ '#/pages/Login'),
        ),
      },
    ],
  },
  {
    path: '/device',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'rsu',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/RSU/DeviceList')),
      },
      {
        path: 'rsu/details/:id',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/RSU/DeviceDetail')),
      },
      {
        path: 'model',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/RSUModel')),
      },

      {
        path: 'camera',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/Camera')),
      },
    ],
  },
  {
    path: '*',
    component: React.lazy(() => import('#/components/NoMatch')),
  },
  {
    path: '/',
    redirect: '/device/rsu',
  },
];

export default routes;
