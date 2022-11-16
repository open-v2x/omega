import { useMenuStore } from '#/store/menu';
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import React, { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SmileOutlined, HeartOutlined, FrownOutlined } from '@ant-design/icons';

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};

const SiderLayout: FC = ({ children }) => {
  const location = useLocation();

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

  return (
    <ProLayout
      fixSiderbar
      location={{
        pathname: location.pathname,
      }}
      onCollapse={toggle}
      siderWidth={216}
      onMenuHeaderClick={() => console.log('点击了左上角')}
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
    >
      <Outlet />
    </ProLayout>
  );
};

export default SiderLayout;
