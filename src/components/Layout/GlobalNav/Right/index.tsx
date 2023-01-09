import { useMenuStore } from '#/store/menu';
import { LinkOutlined, PushpinFilled, PushpinOutlined } from '@ant-design/icons';
import { Divider, Input, Tooltip } from 'antd';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChildPath, getSecondLevelNavItemLink } from '../common';
import styles from './index.module.less';

interface RightProps {
  items: any[];
  onClose: (item) => void;
  isAdminPage: boolean;
}

const nameMaxLength = 8;
const { Search } = Input;

const Right: FC<RightProps> = props => {
  const { onClose } = props;

  const [rightParams, setRightParams] = useState({
    currentItems: props.items || [],
    enterList: [],
    searchInput: '',
  });

  const { deleteFavoriteMenu, addFavoriteMenu } = useMenuStore();

  const getEnterList = search => {
    const enterList = [];
    if (!search) {
      return enterList;
    }
    const { items = [] } = props;
    items.forEach(item => {
      const { children = [] } = item;
      children.forEach(child => {
        const { children: cs = [], name } = child;
        if (!cs.length) {
          if (name.toLowerCase().includes(search)) {
            enterList.push(child);
          }
        } else {
          cs.forEach(c => {
            if (c.name.toLowerCase().includes(search)) {
              const enter = {
                ...child,
                children: [c],
              };
              enterList.push(enter);
            }
          });
        }
      });
    });
    return enterList;
  };

  const getNavItemsBySearch = (search: string) => {
    const checkWords = (search || '').toLowerCase().trim();
    const { items } = props;
    const currentItems = [];
    items.forEach(item => {
      if (!checkWords) {
        currentItems.push(item);
      } else {
        const { name, children = [] } = item;
        if (t(name).toLowerCase().includes(checkWords)) {
          currentItems.push(item);
        } else {
          const cItems = children.filter(c => {
            const result = t(c.name).toLowerCase().includes(checkWords);
            return result;
          });
          if (cItems.length) {
            currentItems.push({
              ...item,
              children: cItems,
            });
          }
        }
      }
    });
    const enterList = getEnterList(checkWords);
    setRightParams({
      currentItems,
      searchInput: search || '',
      enterList: enterList,
    });
  };

  const onInputChange = e => {
    const { value } = e.target;
    getNavItemsBySearch(value);
  };

  const onSearch = (value: string) => {
    getNavItemsBySearch(value);
  };

  const renderNavItemTitle = item => {
    const { name } = item;
    const nameRender = <span className={styles['link-name-detail']}>{t(name)}</span>;
    return (
      <span className={styles['link-name']}>
        {name.length > nameMaxLength ? <Tooltip title={t(name)}>{nameRender}</Tooltip> : nameRender}
      </span>
    );
  };

  const onChangeFavorite = (e, item) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const { isFavorite, favoriteId, key } = item;
    if (isFavorite) {
      deleteFavoriteMenu(favoriteId);
    } else {
      addFavoriteMenu(key);
    }
  };

  const renderFavoriteBtn = item => {
    const { isFavorite, isExternal } = item;
    if (isExternal) {
      return null;
    }
    const icon = isFavorite ? <PushpinFilled /> : <PushpinOutlined />;
    return (
      <div onClick={e => onChangeFavorite(e, item)} className={styles['favorite-icon']}>
        {icon}
      </div>
    );
  };

  const renderNavItemChildren = item => {
    const { children = [] } = item;
    const currentChildren = children.length ? children : [item];
    const items = currentChildren.map(it => {
      const { name, isExternal } = it;
      const path = getSecondLevelNavItemLink(it);
      const title = renderNavItemTitle(it);
      const linkIcon = isExternal ? <LinkOutlined className={styles['external-icon']} /> : null;
      const favoriteIcon = renderFavoriteBtn(it);
      const link = !isExternal ? (
        <Link onClick={() => onClose(it)} to={path}>
          {title}
          {favoriteIcon}
        </Link>
      ) : (
        <a target="_blank" rel="noreferrer" href={it.path}>
          {title}
          {linkIcon}
        </a>
      );

      return (
        <div key={`${name}-${path}`} className={styles['children-item']}>
          {link}
        </div>
      );
    });
    return items;
  };

  const renderNavItem = item => {
    const { name = '' } = item || {};

    return (
      <div className={styles['nav-item']} key={name}>
        <div className={styles.title}>{t(name)}</div>
        <div className={styles.children}>{renderNavItemChildren(item)}</div>
      </div>
    );
  };

  const renderSearch = () => (
    <div className={styles.search}>
      <Search placeholder={t('Search')} allowClear onChange={onInputChange} onSearch={onSearch} />
    </div>
  );

  const renderSearchResultItem = enter => {
    const { name, children = [] } = enter;
    const child = children[0] || null;
    const first = name;
    const second = child ? child.name : null;
    const path = child ? getChildPath(enter.path, child.path) : enter.path;
    const title = child ? `${first} - ${second}` : first;
    return (
      <div key={path} className={styles['children-item']}>
        <Link onClick={() => onClose(child)} to={path}>
          <span className={styles['link-name']}>{t(title)}</span>
        </Link>
      </div>
    );
  };

  const renderSearchResult = () => {
    const { searchInput = '', enterList = [] } = rightParams;
    if (!searchInput || !enterList.length) {
      return null;
    }
    const items = enterList.map(renderSearchResultItem);
    const title = `${t('Entrance')} (${enterList.length})`;
    return (
      <div className={styles['enter-list']}>
        <Divider />
        <div className={styles['enter-list-title']}>{t(title)}</div>
        <div className={styles['enter-list-content']}>{items}</div>
      </div>
    );
  };

  const renderNavItems = () => {
    const { currentItems = [] } = rightParams;
    return <div className={styles.right}>{currentItems.map(renderNavItem)}</div>;
  };

  return (
    <div id="global-nav-right">
      {renderSearch()}
      {renderNavItems()}
      {renderSearchResult()}
    </div>
  );
};

export default Right;
