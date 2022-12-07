import { menuFilter } from '#/components/Layout/GlobalNav/common';
import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import menuList from '#/router/menus';
interface IMenuStore {
  toggle: boolean;
  menus: MenuDataItem[];
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
  favoriteMenuInit: false,
  setMenus: menus => {
    set({
      menus: menus,
    });
  },
  fetchMenus: () => {
    const formatMenus = (menus?: MenuDataItem[]): MenuDataItem[] => {
      if (!menus) return [];

      const menu = menus.map(({ icon, children: childrens, ...item }) => ({
        ...item,
        name: t(item.name),
        icon: icon,
        children: childrens && formatMenus(childrens),
      }));
      return menu;
    };

    const menus = formatMenus(menuList);

    set({ menus });
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
