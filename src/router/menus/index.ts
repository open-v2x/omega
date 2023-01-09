import { algorithmMenu } from './algorithm';
import { centerMenu } from './center';
import { deviceMenu } from './device';
import { eventMenu } from './event';
import { maintenanceMenu } from './maintenance';
import { systemMenu } from './system';

export const DeviceMenu = {
  ...deviceMenu,
  related: [centerMenu, maintenanceMenu],
};

export const CenterMenu = {
  ...centerMenu,
  related: [deviceMenu, systemMenu],
};

export const MaintenanceMenu = {
  ...maintenanceMenu,
  related: [deviceMenu, eventMenu],
};

export const EventMenu = {
  ...eventMenu,
  related: [systemMenu],
};

export const AlgorithmMenu = {
  ...algorithmMenu,
  related: [eventMenu],
};

export const SystemMenu = {
  ...systemMenu,
  related: [centerMenu],
};

export const menuList = [
  AlgorithmMenu,
  CenterMenu,
  DeviceMenu,
  EventMenu,
  MaintenanceMenu,
  SystemMenu,
];
