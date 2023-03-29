import { lazy } from 'react';

const PATH = '/event';

const routes = [
  {
    path: PATH,
    redirect: `${PATH}/rsi`,
  },
  {
    path: PATH,
    breadcrumbName: 'Event',
    component: lazy(() => import('#/layouts/SiderLayout')),
    layout: true,
    auth: true,
    children: [
      {
        path: `${PATH}/rsi`,
        breadcrumbName: 'Road Side Information',
        component: lazy(
          () => import('#/pages/EventManagement/containers/RoadSideInfomation/RSIList'),
        ),
      },
      {
        path: `${PATH}/rsi/details/:id`,
        breadcrumbName: 'RSI Details',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsi_detail",webpackPrefetch: true */
              '#/pages/EventManagement/containers/RoadSideInfomation/RSIDetail'
            ),
        ),
      },
      {
        path: `${PATH}/rsm`,
        breadcrumbName: 'Roadside Safety Message',
        component: lazy(
          () =>
            import(
              /* webpackChunkName: "edge_event_rsm",webpackPrefetch: true */
              '#/pages/EventManagement/containers/RoadSideSafetyMessage/RSMList'
            ),
        ),
      },
      {
        path: `${PATH}/rsm/details`,
        breadcrumbName: 'RSM Details',
        component: lazy(
          () => import('#/pages/EventManagement/containers/RoadSideSafetyMessage/RSMDetail'),
        ),
      },
      {
        path: `${PATH}/icw`,
        breadcrumbName: 'Intersection Collision Warning',
        component: lazy(
          () => import('#/pages/EventManagement/containers/IntersectionCollisionWarning/ICWList'),
        ),
      },
      {
        path: `${PATH}/icw/details`,
        breadcrumbName: 'ICW Details',
        component: lazy(
          () => import('#/pages/EventManagement/containers/IntersectionCollisionWarning/ICWDetail'),
        ),
      },
      {
        path: `${PATH}/vrucw`,
        breadcrumbName: 'Vulnerable Road User Collision Warning',
        component: lazy(
          () => import('#/pages/EventManagement/containers/ValnerableRoadMessage/VRUCWList'),
        ),
      },
      {
        path: `${PATH}/vrucw/details`,
        breadcrumbName: 'VRUCW Details',
        component: lazy(
          () => import('#/pages/EventManagement/containers/ValnerableRoadMessage/VRUCWDetail'),
        ),
      },
      {
        path: `${PATH}/dnpw`,
        breadcrumbName: 'Do Not Pass Warning',
        component: lazy(() => import('#/pages/EventManagement/containers/DoNotPassWarning')),
      },
      {
        path: `${PATH}/sds`,
        breadcrumbName: 'Sensor Data Sharing',
        component: lazy(() => import('#/pages/EventManagement/containers/SensorDataSharing')),
      },
      {
        path: `${PATH}/clc`,
        breadcrumbName: 'Cooperative Lane Change',
        component: lazy(() => import('#/pages/EventManagement/containers/CooperativeLaneChange')),
      },
      {
        path: `${PATH}/congestion`,
        breadcrumbName: 'Congestion Event',
        component: lazy(() => import('#/pages/EventManagement/containers/CongestionWarning')),
      },
      {
        path: `${PATH}/congestion/details/:id`,
        breadcrumbName: 'Congestion Event Detail',
        component: lazy(
          () => import('#/pages/EventManagement/containers/CongestionWarning/Detail'),
        ),
      },
      {
        path: `${PATH}/overspeed`,
        breadcrumbName: 'Overspeed Warning',
        component: lazy(() => import('#/pages/EventManagement/containers/OverspeedWarning')),
      },
      {
        path: `${PATH}/overspeed/details/:id`,
        breadcrumbName: 'Overspeed Warning Detail',
        component: lazy(() => import('#/pages/EventManagement/containers/OverspeedWarning/Detail')),
      },
      {
        path: `${PATH}/slowerspeed`,
        breadcrumbName: 'Slower Speed Warning',
        component: lazy(() => import('#/pages/EventManagement/containers/SlowerSpeedWarning')),
      },
      {
        path: `${PATH}/slowerspeed/details/:id`,
        breadcrumbName: 'Slower Speed Warning Detail',
        component: lazy(
          () => import('#/pages/EventManagement/containers/SlowerSpeedWarning/Detail'),
        ),
      },
      {
        path: `${PATH}/retrograde`,
        breadcrumbName: 'Retrograde Warning',
        component: lazy(() => import('#/pages/EventManagement/containers/RetrogradeWarning')),
      },
      {
        path: `${PATH}/retrograde/details/:id`,
        breadcrumbName: 'Retrograde Warning Detail',
        component: lazy(
          () => import('#/pages/EventManagement/containers/RetrogradeWarning/Detail'),
        ),
      },
    ],
  },
];

export default routes;
