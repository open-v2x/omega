const menuList = [
  {
    path: '/device',
    name: 'Device',
    icon: 'icon-deviceshare',
    children: [
      {
        path: 'rsu',
        name: 'RSU Device',
      },
      {
        path: 'rsu/details/:id',
        name: 'Device Details',
        hideInMenu: true,
      },
      {
        path: 'model',
        name: 'model',
      },
    ],
  },
  {
    path: '/manage',
    name: 'Manage',
  },
];

export default menuList;
