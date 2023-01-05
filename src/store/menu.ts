import { DeviceMenu } from './../router/menus/index';
import { menuFilter } from '#/components/Layout/GlobalNav/common';
import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import { menuList } from '#/router/menus/index';
import { formatMenus } from '#/utils/path';
interface IMenuStore {
  toggle: boolean;
  menus: MenuDataItem[];
  rightMenus: [];
  relatedMenus: MenuDataItem[];
  favoriteMenu: any[];
  favoriteMenuInit: boolean;
  setMenus: (menus: MenuDataItem[]) => void;
  getMenus: () => MenuDataItem[];
  setRelatedMenus: (menus: MenuDataItem[]) => void;
  getRelatedMenus: () => MenuDataItem[];
  // you can hard-code or fetch the menus
  fetchMenus: () => void;
  fetchFavoriteMenus: () => void;
  fetchRightMenus: () => void;
  addFavoriteMenu: (key: string) => void;
  deleteFavoriteMenu: (favoriteId: number, isAdminPage?: boolean) => void;
}

const useMenuStore = create<IMenuStore>((set, get) => ({
  toggle: false,
  menus: [],
  rightMenus: [],
  relatedMenus: [],
  favoriteMenu: [
    {
      path: '/device',
      name: 'Device',
      icon: 'icon-deviceshare',
      children: [
        {
          path: '/device/rsu',
          name: 'RSU Device',
        },
      ],
    },
  ],
  favoriteMenuInit: false,
  setMenus: menus => {
    const mList = formatMenus(menus);
    localStorage.setItem('v2x_omega_menu', JSON.stringify(menus));
    set({
      menus: mList,
    });
  },
  setRelatedMenus: menus => {
    const mList = formatMenus(menus);
    localStorage.setItem('v2x_omega_rmenu', JSON.stringify(menus));
    set({
      relatedMenus: mList,
    });
  },
  fetchMenus: () => {
    const menus = get().getMenus();
    const related = get().getRelatedMenus();
    set({ menus, relatedMenus: related });
  },
  fetchFavoriteMenus: () => {
    // TODO favorite menu, when you get the favoriteMenu
    if (!get().favoriteMenuInit) {
      set({
        favoriteMenuInit: true,
      });
    }
  },
  addFavoriteMenu: () => {},
  deleteFavoriteMenu: () => {},
  fetchRightMenus: () => {
    const result = menuFilter(menuList);
    set({
      rightMenus: result,
    });
  },
  getMenus: () => {
    if (get().menus.length > 0) {
      return get().menus;
    }
    const menus = localStorage.getItem('v2x_omega_menu');
    if (menus) {
      return formatMenus(JSON.parse(menus));
    }
    return DeviceMenu.children;
  },
  getRelatedMenus: () => {
    if (get().relatedMenus.length > 0) {
      return get().menus;
    }
    const menus = localStorage.getItem('v2x_omega_rmenu');
    if (menus) {
      return formatMenus(JSON.parse(menus));
    }
    return DeviceMenu.related;
  },
}));

export { useMenuStore };
