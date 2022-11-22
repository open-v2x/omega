import React, { FC } from 'react';
import { getFavoriteMenuItems, getSecondLevelNavItemLink } from '../common';
import { PushpinFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './index.module.less';

import { defaultNavInLeft } from '#/layouts/SiderLayout/console-nav';
import { defaultNavInLeft as defaultNavInLeftAdmin } from '#/layouts/SiderLayout/admin-nav';
import { useMenuStore } from '#/store/menu';

interface LeftProps {
  isAdminPage: boolean;
  navItems: any[];
  onClose: () => void;
}

const Left: FC<LeftProps> = props => {
  const { navItems = [], isAdminPage = false } = props;

  const { deleteFavoriteMenu, favoriteMenuInit, favoriteMenu } = useMenuStore();

  const getFavoriteMenuItemList = () => getFavoriteMenuItems(navItems, favoriteMenu, isAdminPage);

  const getAllSecondLevels = () => {
    if (!favoriteMenuInit) {
      return [];
    }
    const favoriteMenuItems = getFavoriteMenuItemList();
    if (favoriteMenuItems.length) {
      return favoriteMenuItems;
    }
    const defaultMenu = isAdminPage ? defaultNavInLeftAdmin : defaultNavInLeft;
    return defaultMenu;
  };

  const onChangeFavorite = (e, item) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const { favoriteId } = item;
    deleteFavoriteMenu(favoriteId, isAdminPage);
  };

  const renderFavoriteIcon = item => {
    const { favoriteId } = item;
    if (!favoriteId) {
      return null;
    }
    return (
      <div onClick={e => onChangeFavorite(e, item)} className={styles['favorite-icon-left']}>
        <PushpinFilled />
      </div>
    );
  };

  const renderItem = item => {
    const icon = renderFavoriteIcon(item);
    return (
      <div className={styles.item} key={item.key}>
        <Link
          onClick={props.onClose}
          to={getSecondLevelNavItemLink(item)}
          className={styles['item-label']}
        >
          {item.name}
          {icon}
        </Link>
      </div>
    );
  };

  return favoriteMenuInit ? (
    <div id="global-nav-left">{getAllSecondLevels().map(renderItem)}</div>
  ) : (
    <Spin />
  );
};

export default Left;
