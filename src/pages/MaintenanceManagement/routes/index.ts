import { lazy } from 'react';

const PATH = '/maintenance';

const routes = [
  {
    path: PATH,
    redirect: `${PATH}/business`,
  },
  {
    path: PATH,
    component: lazy(() => import('#/layouts/SiderLayout')),
    breadcrumbName: 'Maintenance',
    layout: true,
    auth: true,
    children: [
      {
        path: `${PATH}/crossing`,
        breadcrumbName: 'Crossing Management',
        component: lazy(() => import('#/pages/MaintenanceManagement/containers/Crossing/List')),
      },
      {
        path: `${PATH}/crossing/details/:id`,
        breadcrumbName: 'Crossing Managemen Detail',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_crossing_detail",webpackPrefetch: true */
              '#/pages/MaintenanceManagement/containers/Crossing/Detail'
            ),
        ),
      },
      {
        path: `${PATH}/crossing/preview/:id`,
        breadcrumbName: 'MAP Preview',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_crossing_preview",webpackPrefetch: true */
              '#/pages/MaintenanceManagement/containers/Crossing/Preview'
            ),
        ),
      },
      {
        path: `${PATH}/bitmap/preview/:id`,
        breadcrumbName: 'Bitmap Preview',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_maintenance_bitmap_preview",webpackPrefetch: true */
              '#/pages/MaintenanceManagement/containers/Crossing/Preview/BitmapPreview'
            ),
        ),
      },
      {
        path: `${PATH}/business`,
        breadcrumbName: 'RSU Business Config',
        component: lazy(
          () => import('#/pages/MaintenanceManagement/containers/BusinessConfig/ConfigList'),
        ),
      },
      {
        path: `${PATH}/business/details/:id`,
        breadcrumbName: 'Business Details',
        component: lazy(
          () => import('#/pages/MaintenanceManagement/containers/BusinessConfig/ConfigDetail'),
        ),
      },
      {
        path: `${PATH}/maintenance`,
        breadcrumbName: 'RSU Maintenance Config',
        component: lazy(() => import('#/pages/MaintenanceManagement/containers/RSUMaintenance')),
      },
      {
        path: `${PATH}/log`,
        breadcrumbName: 'RSU Log Config',
        component: lazy(() => import('#/pages/MaintenanceManagement/containers/LogConfig')),
      },
      {
        path: `${PATH}/query`,
        breadcrumbName: 'RSU Information Query',
        component: lazy(
          () => import('#/pages/MaintenanceManagement/containers/RSUInfoQuery/InfoQueryList'),
        ),
      },
      {
        path: `${PATH}/query/details/:id`,
        breadcrumbName: 'Query Details',
        component: lazy(
          () => import('#/pages/MaintenanceManagement/containers/RSUInfoQuery/InfoQueryDetail'),
        ),
      },
      {
        path: `${PATH}/map`,
        breadcrumbName: 'Map Management',
        component: lazy(() => import('#/pages/MaintenanceManagement/containers/MapConfig/List')),
      },
      {
        path: `${PATH}/map/details/:id`,
        breadcrumbName: 'Map Details',
        component: lazy(() => import('#/pages/MaintenanceManagement/containers/MapConfig/Detail')),
      },
    ],
  },
];

export default routes;
