import { lazy } from 'react';

const PATH = '/device';

const routes = [
  {
    path: PATH,
    redirect: `${PATH}/rsu`,
  },
  {
    path: PATH,
    component: lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    breadcrumbName: 'Device',
    children: [
      {
        path: `${PATH}/rsu`,
        breadcrumbName: 'RSU Device',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/RSU/DeviceList'
            ),
        ),
      },
      {
        path: `${PATH}/rsu/details/:id`,
        breadcrumbName: 'Device Details',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_rsu_detail",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/RSU/DeviceDetail'
            ),
        ),
      },
      {
        path: `${PATH}/model`,
        breadcrumbName: 'RSU Model',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_model",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/RSUModel'
            ),
        ),
      },

      {
        path: `${PATH}/camera`,
        breadcrumbName: 'Camera Device',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_camera",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Camera'
            ),
        ),
      },
      {
        path: `${PATH}/radar`,
        breadcrumbName: 'Radar Device',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_radar",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Radar'
            ),
        ),
      },
      {
        path: `${PATH}/lidar`,
        breadcrumbName: 'Lidar Device',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_lidar",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Lidar'
            ),
        ),
      },
      {
        path: `${PATH}/spat`,
        breadcrumbName: 'SPAT Device',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_spat",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/SPAT'
            ),
        ),
      },
    ],
  },
];

export default routes;
