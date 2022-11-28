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
      {
        path: 'radar',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/Radar')),
      },
      {
        path: 'lidar',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/Lidar')),
      },
      {
        path: 'spat',
        component: React.lazy(() => import('#/pages/Edge/DeviceManagement/SPAT')),
      },
    ],
  },
  {
    path: '/maintenance',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'map',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/MapConfig/ConfigList'),
        ),
      },
      {
        path: 'map/details/:id',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/MapConfig/ConfigDetail'),
        ),
      },
      {
        path: 'map/preview/:id',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/MapConfig/ConfigPreview'),
        ),
      },
      {
        path: 'business',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/BusinessConfig/ConfigList'),
        ),
      },
      {
        path: 'business/details/:id',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/BusinessConfig/ConfigDetail'),
        ),
      },
      {
        path: 'maintenance',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/RSUMaintenance')),
      },
      {
        path: 'log',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/LogConfig')),
      },
      {
        path: 'query',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/RSUInfoQuery/InfoQueryList'),
        ),
      },
      {
        path: 'query/details/:id',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/RSUInfoQuery/InfoQueryDetail'),
        ),
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
