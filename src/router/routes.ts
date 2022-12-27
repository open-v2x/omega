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
    path: '/center',
    component: React.lazy(() => import('#/layouts/ContainerLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'site',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "center_site",webpackPrefetch: true */ '#/pages/Center/Site'
            ),
        ),
      },
      {
        path: 'cloud',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "center_cloud",webpackPrefetch: true */ '#/pages/Center/Cloud'
            ),
        ),
      },
      {
        path: 'map',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "center_map",webpackPrefetch: true */ '#/pages/Center/IntersectionMap'
            ),
        ),
      },
    ],
  },
  {
    path: '/device',
    component: React.lazy(() => import('#/layouts/ContainerLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'rsu',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSU/DeviceList'
            ),
        ),
      },
      {
        path: 'rsu/details/:id',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu_detail",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSU/DeviceDetail'
            ),
        ),
      },
      {
        path: 'model',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_model",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSUModel'
            ),
        ),
      },

      {
        path: 'camera',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_camera",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Camera'
            ),
        ),
      },
      {
        path: 'radar',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_radar",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Radar'
            ),
        ),
      },
      {
        path: 'lidar',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_lidar",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Lidar'
            ),
        ),
      },
      {
        path: 'spat',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_spat",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/SPAT'
            ),
        ),
      },
    ],
  },
  {
    path: '/maintenance',
    component: React.lazy(() => import('#/layouts/ContainerLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'map',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_map",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/MapConfig/ConfigList'
            ),
        ),
      },
      {
        path: 'map/details/:id',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_map_detail",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/MapConfig/ConfigDetail'
            ),
        ),
      },
      {
        path: 'map/preview/:id',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_map_preview",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/MapConfig/ConfigPreview'
            ),
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
      {
        path: 'crossing',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/Crossing/List')),
      },
    ],
  },
  {
    path: '/event',
    component: React.lazy(() => import('#/layouts/ContainerLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'rsi',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/RoadSideInfomation/RSIList'),
        ),
      },
      {
        path: 'rsi/details/:id',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsi_detail",webpackPrefetch: true */
              '#/pages/Edge/EventManagement/RoadSideInfomation/RSIDetail'
            ),
        ),
      },
      {
        path: 'rsm',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsm",webpackPrefetch: true */
              '#/pages/Edge/EventManagement/RoadSideSafetyMessage/RSMList'
            ),
        ),
      },
      {
        path: 'rsm/details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/RoadSideSafetyMessage/RSMDetail'),
        ),
      },
      {
        path: 'icw',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/IntersectionCollisionWarning/ICWList'),
        ),
      },
      {
        path: 'icw/details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/IntersectionCollisionWarning/ICWDetail'),
        ),
      },
      {
        path: 'vrucw',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/ValnerableRoadMessage/VRUCWList'),
        ),
      },
      {
        path: 'vrucw/details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/ValnerableRoadMessage/VRUCWDetail'),
        ),
      },
      {
        path: 'dnpw',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/DoNotPassWarning')),
      },
      {
        path: 'sds',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/SensorDataSharing')),
      },
      {
        path: 'clc',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/CooperativeLaneChange')),
      },
    ],
  },
  {
    path: '/system',
    component: React.lazy(() => import('#/layouts/ContainerLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: 'site',
        component: React.lazy(() => import('#/pages/Edge/SystemConfiguration/EdgeSiteConfig')),
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
  {
    path: '/device',
    redirect: '/device/rsu',
  },
  {
    path: '/maintenance',
    redirect: '/maintenance/map',
  },
  {
    path: '/event',
    redirect: '/event/rsi',
  },
  { path: '/system', redirect: 'site' },
];

export default routes;
