export const maintenanceMenu = {
  path: '/maintenance',
  name: 'Maintenance',
  icon: 'icon-maintenance',
  children: [
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
    {
      path: '/maintenance/crossing',
      name: 'Crossing Management',
    },
    {
      path: '/maintenance/bitmap/preview/:id',
      name: 'Bitmap Preview',
      hideInMenu: true,
    },
  ],
};
