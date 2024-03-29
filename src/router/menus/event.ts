export const eventMenu = {
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
      path: '/event/rsm/details',
      name: 'RSM Details',
      hideInMenu: true,
    },
    {
      path: '/event/icw',
      name: 'Intersection Collision Warning',
    },
    {
      path: '/event/icw/details',
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
    {
      path: '/event/congestion',
      name: 'Congestion Event',
    },
    {
      path: '/event/congestion/details/:id',
      name: 'Congestion Event Detail',
      hideInMenu: true,
    },
    {
      path: '/event/overspeed',
      name: 'Overspeed Warning',
    },
    {
      path: '/event/overspeed/details/:id',
      name: 'Overspeed Warning Detail',
      hideInMenu: true,
    },
    {
      path: '/event/slowerspeed',
      name: 'Slower Speed Warning',
    },
    {
      path: '/event/slowerspeed/details/:id',
      name: 'Slower Speed Warning Detail',
      hideInMenu: true,
    },
    {
      path: '/event/retrograde',
      name: 'Retrograde Warning',
    },
  ],
};
