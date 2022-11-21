import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import menuList from '#/router/menus';

interface IMenuStore {
  toggle: boolean;
  menus: MenuDataItem[];
  relatedMenus: MenuDataItem[];
  favoriteMenu: any[];
  favoriteMenuInit: boolean;
  // you can hard-code or fetch the menus
  fetchMenus: () => void;
  fetchFavoriteMenus: () => void;
  addFavoriteMenu: (key: string) => void;
  deleteFavoriteMenu: (favoriteId: number, isAdminPage?: boolean) => void;
}

const useMenuStore = create<IMenuStore>((set, get) => ({
  toggle: false,
  menus: [],
  relatedMenus: [],
  favoriteMenu: [],
  favoriteMenuInit: false,
  fetchMenus: () => {
    set({
      menus: menuList,
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
  addFavoriteMenu: key => {},
  deleteFavoriteMenu: () => {},
}));

export { useMenuStore };
