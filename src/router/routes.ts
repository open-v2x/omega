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
    breadcrumbName: 'Traffic screen',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: '/center/map',
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
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    breadcrumbName: 'Device',
    children: [
      {
        path: '/device/rsu',
        breadcrumbName: 'RSU Device',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSU/DeviceList'
            ),
        ),
      },
      {
        path: '/device/rsu/details/:id',
        breadcrumbName: 'Device Details',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu_detail",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSU/DeviceDetail'
            ),
        ),
      },
      {
        path: '/device/model',
        breadcrumbName: 'RSU Model',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_model",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/RSUModel'
            ),
        ),
      },

      {
        path: '/device/camera',
        breadcrumbName: 'Camera Device',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_camera",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Camera'
            ),
        ),
      },
      {
        path: '/device/radar',
        breadcrumbName: 'Radar Device',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_radar",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Radar'
            ),
        ),
      },
      {
        path: '/device/lidar',
        breadcrumbName: 'Lidar Device',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_lidar",webpackPrefetch: true */
              '#/pages/Edge/DeviceManagement/Lidar'
            ),
        ),
      },
      {
        path: '/device/spat',
        breadcrumbName: 'SPAT Device',
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
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    breadcrumbName: 'Maintenance',
    layout: true,
    auth: true,
    children: [
      {
        path: '/maintenance/crossing',
        breadcrumbName: 'Crossing Management',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/Crossing/List')),
      },
      {
        path: '/maintenance/crossing/details/:id',
        breadcrumbName: 'Crossing Managemen Detail',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_crossing_detail",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/Crossing/Detail'
            ),
        ),
      },
      {
        path: '/maintenance/crossing/preview/:id',
        breadcrumbName: 'MAP Preview',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_crossing_preview",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/Crossing/Preview'
            ),
        ),
      },
      {
        path: '/maintenance/bitmap/preview/:id',
        breadcrumbName: 'Bitmap Preview',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_bitmap_preview",webpackPrefetch: true */
              '#/pages/Edge/MaintenanceManagement/Crossing/Preview/BitmapPreview'
            ),
        ),
      },
      {
        path: '/maintenance/business',
        breadcrumbName: 'RSU Business Config',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/BusinessConfig/ConfigList'),
        ),
      },
      {
        path: '/maintenance/business/details/:id',
        breadcrumbName: 'Business Details',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/BusinessConfig/ConfigDetail'),
        ),
      },
      {
        path: '/maintenance/maintenance',
        breadcrumbName: 'RSU Maintenance Config',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/RSUMaintenance')),
      },
      {
        path: '/maintenance/log',
        breadcrumbName: 'RSU Log Config',
        component: React.lazy(() => import('#/pages/Edge/MaintenanceManagement/LogConfig')),
      },
      {
        path: '/maintenance/query',
        breadcrumbName: 'RSU Information Query',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/RSUInfoQuery/InfoQueryList'),
        ),
      },
      {
        path: '/maintenance/query/details/:id',
        breadcrumbName: 'Query Details',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/RSUInfoQuery/InfoQueryDetail'),
        ),
      },
      {
        path: '/maintenance/map',
        breadcrumbName: 'Map Management',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/containers/MapConfig/List'),
        ),
      },
      {
        path: '/maintenance/map/details/:id',
        breadcrumbName: 'Map Details',
        component: React.lazy(
          () => import('#/pages/Edge/MaintenanceManagement/containers/MapConfig/Detail'),
        ),
      },
    ],
  },
  {
    path: '/event',
    breadcrumbName: 'Event',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: '/event/rsi',
        breadcrumbName: 'Road Side Information',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/RoadSideInfomation/RSIList'),
        ),
      },
      {
        path: '/event/rsi/details/:id',
        breadcrumbName: 'RSI Details',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsi_detail",webpackPrefetch: true */
              '#/pages/Edge/EventManagement/RoadSideInfomation/RSIDetail'
            ),
        ),
      },
      {
        path: '/event/rsm',
        breadcrumbName: 'Roadside Safety Message',
        component: React.lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsm",webpackPrefetch: true */
              '#/pages/Edge/EventManagement/RoadSideSafetyMessage/RSMList'
            ),
        ),
      },
      {
        path: '/event/rsm/details',
        breadcrumbName: 'RSM Details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/RoadSideSafetyMessage/RSMDetail'),
        ),
      },
      {
        path: '/event/icw',
        breadcrumbName: 'Intersection Collision Warning',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/IntersectionCollisionWarning/ICWList'),
        ),
      },
      {
        path: '/event/icw/details',
        breadcrumbName: 'ICW Details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/IntersectionCollisionWarning/ICWDetail'),
        ),
      },
      {
        path: '/event/vrucw',
        breadcrumbName: 'Vulnerable Road User Collision Warning',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/ValnerableRoadMessage/VRUCWList'),
        ),
      },
      {
        path: '/event/vrucw/details',
        breadcrumbName: 'VRUCW Details',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/ValnerableRoadMessage/VRUCWDetail'),
        ),
      },
      {
        path: '/event/dnpw',
        breadcrumbName: 'Do Not Pass Warning',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/DoNotPassWarning')),
      },
      {
        path: '/event/sds',
        breadcrumbName: 'Sensor Data Sharing',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/SensorDataSharing')),
      },
      {
        path: '/event/clc',
        breadcrumbName: 'Cooperative Lane Change',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/CooperativeLaneChange')),
      },
      {
        path: '/event/congestion',
        breadcrumbName: 'Congestion Event',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/CongestionWarning')),
      },
      {
        path: '/event/congestion/details/:id',
        breadcrumbName: 'Congestion Event Detail',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/CongestionWarning/Detail'),
        ),
      },
      {
        path: '/event/overspeed',
        breadcrumbName: 'Overspeed Warning',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/OverspeedWarning')),
      },
      {
        path: '/event/overspeed/details/:id',
        breadcrumbName: 'Overspeed Warning Detail',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/OverspeedWarning/Detail')),
      },
      {
        path: '/event/slowerspeed',
        breadcrumbName: 'Slower Speed Warning',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/SlowerSpeedWarning')),
      },
      {
        path: '/event/slowerspeed/details/:id',
        breadcrumbName: 'Slower Speed Warning Detail',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/SlowerSpeedWarning/Detail'),
        ),
      },
      {
        path: '/event/retrograde',
        breadcrumbName: 'Retrograde Warning',
        component: React.lazy(() => import('#/pages/Edge/EventManagement/RetrogradeWarning')),
      },
      {
        path: '/event/retrograde/details/:id',
        breadcrumbName: 'Retrograde Warning Detail',
        component: React.lazy(
          () => import('#/pages/Edge/EventManagement/RetrogradeWarning/Detail'),
        ),
      },
    ],
  },
  {
    path: '/algorithm',
    breadcrumbName: 'Algorithm Management',
    component: React.lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: '/algorithm/config',
        breadcrumbName: 'Algorithm Config',
        component: React.lazy(() => import('#/pages/Edge/AlgorithmManagement/Config')),
      },
      {
        path: '/algorithm/version',
        breadcrumbName: 'Algorithm Version',
        component: React.lazy(() => import('#/pages/Edge/AlgorithmManagement/Version')),
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
    redirect: '/maintenance/business',
  },
  {
    path: '/event',
    redirect: '/event/rsi',
  },
  {
    path: '/algorithm',
    redirect: '/algorithm/config',
  },
  {
    path: '/center',
    redirect: '/center/map?type=1',
  },
];

export default routes;
