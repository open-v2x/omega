import { menuFilter } from '#/components/Layout/GlobalNav/common';
import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import menuList from '#/router/menus';
import { treeToList } from '#/router/routerHelper';
interface IMenuStore {
  toggle: boolean;
  menus: MenuDataItem[];
  flatMenus: any[];
  rightMenus: [];
  relatedMenus: MenuDataItem[];
  favoriteMenu: any[];
  favoriteMenuInit: boolean;
  setMenus: (menus: MenuDataItem[]) => void;
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
  flatMenus: [],
  favoriteMenuInit: false,
  setMenus: menus => {
    set({
      menus: menus,
    });
  },
  fetchMenus: () => {
    set({
      menus: menuList,
      flatMenus: treeToList(menuList, 'children', ['path', 'name']),
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
}));

export { useMenuStore };
