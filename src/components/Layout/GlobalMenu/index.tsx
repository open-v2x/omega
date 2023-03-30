import { useMenuStore } from '#/store/menu';
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider, Menu } from 'antd';
import { isString } from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
const { SubMenu } = Menu;
import styles from './index.module.less';
import { QIANKUN_PREFIX } from '#/constants/variable';

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

  const defaultSelectedkey = window.__POWERED_BY_QIANKUN__
    ? location.pathname.substring(QIANKUN_PREFIX.length)
    : location.pathname;

  return (
    <Menu
      defaultOpenKeys={[currentMenu?.path]}
      defaultSelectedKeys={[defaultSelectedkey]}
      mode="inline"
      onClick={handleClick}
      inlineCollapsed={toggle}
    >
      {menus.map(menu => {
        if (menu.children.length > 0) {
          return (
            <SubMenu
              key={`${menu.path}`}
              title={t(menu.name)}
              icon={isString(menu.icon) ? <IconFont type={menu.icon} /> : menu.icon}
            >
              {menu.children.map(node =>
                node.hideInMenu ? null : (
                  <Menu.Item key={`${node.path}`} className={styles['menu-item']}>
                    {t(node.name)}
                  </Menu.Item>
                ),
              )}
            </SubMenu>
          );
        }
        return (
          <Menu.Item
            className={styles['menu-item']}
            key={`${menu.path}`}
            icon={isString(menu.icon) ? <IconFont type={menu.icon} /> : menu.icon}
          >
            {t(menu.name)}
          </Menu.Item>
        );
      })}

      <Divider key={'menu-divider'} />

      {!toggle && <div className={styles['related-link']}>{t('Related Links')}</div>}

      {relatedMenu.map(relate => (
        <Menu.Item
          key={`${relate.path}`}
          className={styles['menu-item']}
          icon={isString(relate.icon) ? <IconFont type={relate.icon} /> : relate.icon}
        >
          {t(relate.name)}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default GlobalMenu;
