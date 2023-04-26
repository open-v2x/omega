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
        path: `${PATH}/camera/details/:id`,
        breadcrumbName: 'Camera Device Details',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_camera_detail",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Camera/Detail'
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
        path: `${PATH}/radar/details/:id`,
        breadcrumbName: 'Radar Device Detail',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_radar_detail",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Radar/Detail'
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
        path: `${PATH}/lidar/details/:id`,
        breadcrumbName: 'Lidar Device Detail',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_lidar_detail",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/Lidar/Detail'
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
      {
        path: `${PATH}/spat/details/:id`,
        breadcrumbName: 'SPAT Device Detail',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_spat_detail",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/SPAT/Detail'
            ),
        ),
      },
      {
        path: `${PATH}/thunder-vision`,
        breadcrumbName: 'Thunder Vision',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_thunder_vision",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/ThunderVision/List'
            ),
        ),
      },
      {
        path: `${PATH}/thunder-vision/details/:id`,
        breadcrumbName: 'Thunder Vision',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_device_thunder_vision",webpackPrefetch: true */
              '#/pages/DeviceManagement/containers/ThunderVision/Detail'
            ),
        ),
      },
    ],
  },
];

export default routes;
