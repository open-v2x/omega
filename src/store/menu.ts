import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import menuList from '#/router/menus';

interface IMenuStore {
  toggle: boolean;
  menus: MenuDataItem[];
  // you can hard-code or fetch the menus
  fetchMenus: () => void;
  fetchFavoriteMenus: () => void;
}

const useMenuStore = create<IMenuStore>(set => ({
  toggle: false,
  menus: [],
  fetchMenus: () => {
    set({
      menus: menuList,
    });
  },
  fetchFavoriteMenus: () => {
    // TODO favorite menu
  },
}));

export { useMenuStore };
