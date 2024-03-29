import { MenuDataItem } from '@ant-design/pro-components';
import { get } from 'lodash';
import qs from 'qs';

const routeMap = {};

const generatePath = (record, params) => {
  const { path } = record;
  if (!params) {
    return path;
  }
  let newPath = path;
  Object.keys(params).forEach(key => {
    newPath = newPath.replace(`:${key}`, params[key]);
  });
  return newPath;
};

export const getPath = ({ key, params, query = {} }) => {
  const record = get(routeMap, key);
  if (!record) {
    return '/';
  }
  const path = generatePath(record, params);
  const str = qs.stringify(query);
  return str ? `${path}?${str}` : path;
};

export const formatMenus = (menus?: MenuDataItem[] | MenuDataItem): MenuDataItem[] => {
  if (!menus) return [];

  if (Array.isArray(menus)) {
    const menu = menus.map(({ icon, children: childrens, ...item }) => ({
      ...item,
      icon: icon,
      children: childrens && formatMenus(childrens),
    }));
    return menu;
  } else {
    const { icon, children: childrens, ...item } = menus;
    return [
      {
        ...item,
        icon: icon,
        children: childrens && formatMenus(childrens),
      },
    ];
  }
};
