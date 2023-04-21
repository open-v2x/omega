import { useMenuStore } from '#/store/menu';
import { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import { isString } from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ItemType } from 'rc-menu/lib/interface';
import styles from './index.module.less';

const GlobalMenu: React.FC = () => {
  const menus = useMenuStore(state => state.menus);
  const relatedMenu = useMenuStore(state => state.relatedMenus);
  const toggle = useMenuStore(state => state.toggle);
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenu = useMenuStore(state => state.currentMenu);

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
        key: 'submenu',
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

  return (
    <Menu
      defaultOpenKeys={[currentMenu?.path]}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      onClick={handleClick}
      inlineCollapsed={toggle}
      items={items}
    />
  );
};

export default GlobalMenu;
