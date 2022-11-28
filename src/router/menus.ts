const menuList = [
  {
    path: '/device',
    name: 'Device',
    icon: 'icon-device',
    children: [
      {
        path: '/device/rsu',
        name: 'RSU Device',
      },
      {
        path: '/device/rsu/details/:id',
        name: 'Device Details',
        hideInMenu: true,
      },
      {
        path: '/device/model',
        name: 'RSU Model',
      },
      {
        path: '/device/camera',
        name: 'Camera Device',
      },
      {
        path: '/device/radar',
        name: 'Radar Device',
      },
      {
        path: '/device/lidar',
        name: 'Lidar Device',
      },
      {
        path: '/device/spat',
        name: 'SPAT Device',
      },
    ],
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    icon: 'icon-maintain',
    children: [
      {
        path: '/maintenance/map',
        name: 'MAP Config',
      },
      {
        path: '/maintenance/map/details/:id',
        name: 'MAP Details',
        hideInMenu: true,
      },
      {
        path: '/maintenance/map/preview/:id',
        name: 'MAP Preview',
        hideInMenu: true,
      },
      {
        path: '/maintenance/business',
        name: 'RSU Business Config',
      },
      {
        path: '/maintenance/business/details/:id',
        name: 'Business Details',
        hideInMenu: true,
      },
      {
        path: '/maintenance/maintenance',
        name: 'RSU Maintenance Config',
      },
      {
        path: '/maintenance/log',
        name: 'RSU Log Config',
      },
      {
        path: '/maintenance/query',
        name: 'RSU Information Query',
      },
      {
        path: '/maintenance/query/details/:id',
        name: 'Query Details',
        hideInMenu: true,
      },
    ],
  },
];

export default menuList;
