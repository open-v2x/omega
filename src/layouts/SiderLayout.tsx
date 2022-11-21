import { useMenuStore } from '#/store/menu';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import React, { FC, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';
import { useRootStore } from '#/store/root';
import GlobalNav from '#/components/Layout/GlobalNav';
import styles from './sider.module.less';
import layoutSettings from '#/config/proLayoutSetting';
import HeaderRightContent from '#/components/Layout/HeaderRightContent';
import GlobalHeader from '#/components/Layout/GlobalHeader';

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const SiderLayout: FC = ({ children }) => {
  const location = useLocation();

  const showHeader = useRootStore(state => state.showHeader);
  const menuStore = useMenuStore();

  const toggle = () => {
    menuStore.toggle = !menuStore.toggle;
  };

  const formatMenus = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menuStore.menus) return [];

    const menu = menus.map(({ icon, children: childrens, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: childrens && formatMenus(childrens),
    }));
    return menu;
  };

  const init = async () => {
    await menuStore.fetchFavoriteMenus();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ProLayout
      {...layoutSettings}
      location={{
        pathname: location.pathname,
      }}
      className={styles['layout-content']}
      onCollapse={toggle}
      siderWidth={216}
      menuHeaderRender={false}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      menuDataRender={() => formatMenus(menuStore.menus)}
      menuFooterRender={props => {
        if (props?.collapsed) return undefined;
        return menuStore.relatedMenus.length ? (
          <div style={{ height: '100px' }}>关联菜单</div>
        ) : undefined;
      }}
      headerRender={() => <GlobalHeader navItems={[]} isAdminPage={false} />}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '主页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
    >
      {showHeader && <div> Header</div>}
      <Outlet />
    </ProLayout>
  );
};

export default SiderLayout;
