import { menuFilter } from '#/components/Layout/GlobalNav/common';
import { MenuDataItem } from '@ant-design/pro-components';
import create from 'zustand';
import { menuList } from '#/router/menus/index';
import { formatMenus } from '#/utils/path';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
// import * as pathToRegexp from 'path-to-regexp';
const pathToRegexp = require('path-to-regexp');
import routes from '#/router/routes';
interface IMenuStore {
  toggle: boolean;
  currentMenu: MenuDataItem;
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
  getBreadcrumb: (pathname: string) => Route[];
}

const useMenuStore = create<IMenuStore>((set, get) => ({
  toggle: false,
  currentMenu: undefined,
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
  fetchMenus: path => {
    const pPath = `/${path.split('/')[1]}`;
    if (get().currentMenu?.path === pPath) {
      return;
    }
    const currentMenu = menuList.find(m => m.path.startsWith(pPath));

    set({
      menus: formatMenus(currentMenu),
      relatedMenus: formatMenus(currentMenu?.related || []),
      currentMenu: currentMenu,
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
  getBreadcrumb: (pathname: string) => {
    const tempList: Route[] = [];
    try {
      function getNodePath(node) {
        tempList.push(node);
        if (pathToRegexp(node.path).exec(pathname)) {
          throw new Error('Got It');
        }
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
          //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
          tempList.pop();
        } else {
          //找到叶子节点时，删除路径当中的该叶子节点
          tempList.pop();
        }
      }
      for (let i = 0; i < routes.length; i++) {
        getNodePath(routes[i]);
      }
    } catch (error) {
      return tempList;
    }

    return [];
  },
}));

export { useMenuStore };
