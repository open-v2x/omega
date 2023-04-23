import { useMenuStore } from '#/store/menu';
import { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import { isString } from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ItemType } from 'rc-menu/lib/interface';
import styles from './index.module.less';
import routes from '#/router/routes';

const GlobalMenu: React.FC = () => {
  const menus = useMenuStore(state => state.menus);
  const relatedMenu = useMenuStore(state => state.relatedMenus);
  const toggle = useMenuStore(state => state.toggle);
  const location = useLocation();
  const navigate = useNavigate();

  const IconFont = createFromIconfontCN({
    scriptUrl: '/assets/font/iconfont.js',
  });

  const handleClick = props => {
    if (props.key !== location.pathname) {
      navigate(props.key);
    }
  };

  const formatMenus = (menu, hideChildren?: boolean) => {
    if (menu.hideInMenu) {
      return null;
    }
    if (menu.children?.length > 0 && !hideChildren) {
      return {
        key: menu.path,
        label: t(menu.name),
        children: menu.children.map(c => formatMenus(c)),
        icon: isString(menu.icon) ? <IconFont type={menu.icon} /> : menu.icon,
      };
    }

    return {
      key: menu.path,
      label: t(menu.name),
      icon: isString(menu.icon) ? <IconFont type={menu.icon} /> : menu.icon,
    };
  };

  const items: ItemType[] = [
    ...menus.map(menu => formatMenus(menu)),
    {
      type: 'divider',
    },
    toggle
      ? null
      : {
          type: 'group',
          label: t('Related Links'),
          className: styles['related-link'],
        },
    ...relatedMenu.map(relate => formatMenus(relate, true)),
  ];

  const openKeysSet = new Set();
  routes.forEach(r => {
    if (r.path.length < 2 || !r.path.startsWith('/') || openKeysSet.has(r.path)) return;
    openKeysSet.add(r.path);
  });

  const openKeys = Array.from(openKeysSet) as string[];

  return (
    <Menu
      openKeys={openKeys}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      onClick={handleClick}
      inlineCollapsed={toggle}
      items={items}
    />
  );
};

export default GlobalMenu;
