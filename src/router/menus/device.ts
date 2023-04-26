export const deviceMenu = {
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
    {
      path: '/device/thunder-vision',
      name: 'Thunder Vision',
    },
  ],
};
