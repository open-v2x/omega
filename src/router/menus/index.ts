import { algorithmMenu } from './algorithm';
import { centerMenu } from './center';
import { deviceMenu } from './device';
import { eventMenu } from './event';
import { maintenanceMenu } from './maintenance';

export const DeviceMenu = {
  ...deviceMenu,
  related: [centerMenu, maintenanceMenu],
};

export const CenterMenu = {
  ...centerMenu,
  related: [deviceMenu],
};

export const MaintenanceMenu = {
  ...maintenanceMenu,
  related: [deviceMenu, eventMenu],
};

export const EventMenu = {
  ...eventMenu,
  related: [centerMenu],
};

export const AlgorithmMenu = {
  ...algorithmMenu,
  related: [eventMenu],
};

export const menuList = [AlgorithmMenu, CenterMenu, DeviceMenu, EventMenu, MaintenanceMenu];
