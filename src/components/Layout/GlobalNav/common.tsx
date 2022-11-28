// Copyright 2021 99cloud
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import PropTypes from 'prop-types';

export const menuItemPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  children: PropTypes.arrayOf(menuItemPropType),
  key: PropTypes.string.isRequired,
  level: PropTypes.number,
  icon: PropTypes.node,
  routePath: PropTypes.string,
  licenseKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  endpoints: PropTypes.string,
  hasBreadcrumb: PropTypes.bool,
  hasChildren: PropTypes.bool,
});

export const secondLevelNavItemPropType = PropTypes.shape({
  ...menuItemPropType,
  isExternal: PropTypes.bool,
  isHome: PropTypes.bool,
  isFavorite: PropTypes.bool,
  favoriteId: PropTypes.number,
});

export const navItemPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(secondLevelNavItemPropType),
});

export const favoriteMenuPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      is_admin: PropTypes.bool,
      favorite_menu: PropTypes.string,
    }),
  ),
]);

export const getChildPath = (parentPath: string, childPath) => {
  if (childPath.startsWith('/')) {
    return childPath;
  } else {
    return `${parentPath}/${childPath}`;
  }
};

export const getFirstLevelNavItemLink = item => {
  const { children = [] } = item;
  if (!children.length) {
    return item.path;
  }
  return item.children[0].path;
};

export const getSecondLevelNavItemLink = item => {
  const { children = [] } = item;
  if (!children.length) {
    return item.path;
  }
  return item.children[0].path;
};

export const getFavoriteMenuItems = (navItems, favoriteMenu, isAdminPage) => {
  if (!favoriteMenu.length) {
    return [];
  }
  const items = [];
  favoriteMenu.forEach(it => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { favorite_menu, is_admin = false } = it;
    navItems.forEach(nav => {
      const child = (nav.children || []).find(
        c => c.key === favorite_menu && isAdminPage === is_admin,
      );
      if (child) {
        items.push(child);
      }
    });
  });
  return items;
};

export const menuFilter = menus => {
  const result = menus.filter(menu => {
    const { children = [] } = menu;
    menu.children = menuFilter(children);
    return !menu.hideInMenu;
  });
  return result;
};
