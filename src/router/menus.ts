const menuList = [
  {
    path: '/device',
    name: 'Device',
    icon: 'icon-deviceshare',
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
    ],
  },
];

export default menuList;
