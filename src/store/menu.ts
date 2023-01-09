import { DeviceMenu } from './../router/menus/index';
import { menuFilter } from '#/components/Layout/GlobalNav/common';
import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import { menuList } from '#/router/menus/index';
import { formatMenus } from '#/utils/path';
interface IMenuStore {
  toggle: boolean;
  menuRouter: string;
  menus: MenuDataItem[];
  rightMenus: [];
  relatedMenus: MenuDataItem[];
  favoriteMenu: any[];
  favoriteMenuInit: boolean;
  // you can hard-code or fetch the menus
  fetchMenus: (path: string) => void;
  fetchFavoriteMenus: () => void;
  fetchRightMenus: () => void;
  addFavoriteMenu: (key: string) => void;
  deleteFavoriteMenu: (favoriteId: number, isAdminPage?: boolean) => void;
}

const useMenuStore = create<IMenuStore>((set, get) => ({
  toggle: false,
  menus: [],
  menuRouter: '',
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
  fetchMenus: path => {
    const parentPath = path.split('/');
    const pPath = `/${parentPath[1]}`;
    if (get().menuRouter === pPath) {
      return;
    }
    const currentMenu = menuList.find(m => m.path === pPath);

    let menu, related;

    if (currentMenu) {
      menu = formatMenus(currentMenu?.children);
      related = formatMenus(currentMenu?.related || []);
    } else {
      const cMenu = menuList.find(c => c.path === path);
      menu = formatMenus(cMenu);
      related = formatMenus(cMenu?.related || []);
    }
    set({
      menus: menu,
      relatedMenus: related,
      menuRouter: pPath,
    });
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
      return get().relatedMenus;
    }
    const menus = localStorage.getItem('v2x_omega_rmenu');
    if (menus) {
      return formatMenus(JSON.parse(menus));
    }
    return DeviceMenu.related;
  },
  handleChangeMenu: menu => {
    if (menu?.path) {
      const parentPath = menu.path.split('/');
      const pPath = `/${parentPath[1]}`;
      const currentMenu = menuList.find(m => m.path === pPath);

      if (currentMenu) {
        get().setMenus(currentMenu?.children);
        get().setRelatedMenus(currentMenu?.related || []);
      } else {
        const cMenu = menuList.find(c => c.path === menu?.path);
        get().setMenus([cMenu]);
        get().setRelatedMenus(cMenu?.related || []);
      }
    }
  },
}));

export { useMenuStore };
