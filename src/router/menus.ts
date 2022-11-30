const menuList = [
  {
    path: '/center/site',
    name: 'Monitoring Overview',
  },
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
  {
    path: '/event',
    name: 'Event',
    icon: 'icon-event',
    children: [
      {
        path: '/event/rsi',
        name: 'Road Side Information',
      },
      {
        path: '/event/rsi/details/:id',
        name: 'RSI Details',
        hideInMenu: true,
      },
      {
        path: '/event/rsm',
        name: 'Roadside Safety Message',
      },
      {
        path: '/event/rsm/details/:id',
        name: 'RSM Details',
        hideInMenu: true,
      },
      {
        path: '/event/icw',
        name: 'Intersection Collision Warning',
      },
      {
        path: '/event/icw/details/:id',
        name: 'ICW Details',
        hideInMenu: true,
      },
      {
        path: '/event/vrucw',
        name: 'Vulnerable Road User Collision Warning',
      },
      {
        path: '/event/vrucw/details/:id',
        name: 'VRUCW Details',
        hideInMenu: true,
      },
      {
        path: '/event/dnpw',
        name: 'Do Not Pass Warning',
      },
      {
        path: '/event/sds',
        name: 'Sensor Data Sharing',
      },
      {
        path: '/event/clc',
        name: 'Cooperative Lane Change',
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    icon: 'icon-system',
    children: [{ path: '/system/site', name: 'Edge Site Config' }],
  },
];

export default menuList;
