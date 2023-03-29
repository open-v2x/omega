import React from 'react';
import device from '#/pages/DeviceManagement/routes';
import maintenance from '#/pages/MaintenanceManagement/routes';
import event from '#/pages/EventManagement/routes';
import algorithm from '#/pages/AlgorithmManagement/routes';
import traffic from '#/pages/TrafficScreen/routes';
import user from '#/pages/Auth/routes';
const routes = [
  ...user,
  ...traffic,
  ...algorithm,
  ...device,
  ...maintenance,
  ...event,
  {
    path: '*',
    component: React.lazy(() => import('#/components/NoMatch')),
  },
];

export default routes;
