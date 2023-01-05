import { useMenuStore } from '#/store/menu';
import { ProLayout } from '@ant-design/pro-components';
import React, { FC, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import layoutSettings from '#/config/proLayoutSetting';
import GlobalHeader from '#/components/Layout/GlobalHeader';

const SiderLayout: FC = () => {
  const menuStore = useMenuStore();
  const navigate = useNavigate();

  const toggle = () => {
    menuStore.toggle = !menuStore.toggle;
  };

  const init = async () => {
    menuStore.fetchFavoriteMenus();
    menuStore.fetchRightMenus();
  };

  const handleToRelated = item => {
    menuStore.setMenus(item);
    menuStore.setRelatedMenus(item.related || []);
  };

  const renderRelatedMenus = () => (
    <div className={styles['related-container']}>
      <div className={styles['related-container-title']}>关联菜单</div>
      {menuStore.relatedMenus.map(related => (
        <div
          key={related.path}
          className={styles['related-item']}
          onClick={() => handleToRelated(related)}
        >
          {related.name}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    init();
  }, [menuStore.menus]);

  return (
    <ProLayout
      {...layoutSettings}
      className={styles['layout-content']}
      onCollapse={toggle}
      siderWidth={246}
      menuDataRender={() => {
        console.log('menuData', menuStore.menus);
        return menuStore.menus;
      }}
      menuItemRender={item => (
        <div
          style={{
            alignItems: 'center',
            gap: 8,
            overflowWrap: 'break-word',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          onClick={() => {
            navigate(item.path);
          }}
        >
          {item.name}
        </div>
      )}
      menuFooterRender={props => {
        if (props?.collapsed) return undefined;
        return menuStore.relatedMenus.length ? renderRelatedMenus() : undefined;
      }}
      headerRender={() => <GlobalHeader navItems={[]} isAdminPage={false} />}
      breadcrumbRender={(routers = []) =>
        routers.map(router => ({
          ...router,
          breadcrumbName: t(router.breadcrumbName),
        }))
      }
      itemRender={(route, _params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      // onPageChange={location => {
      // if (location.pathname && ) {
      // navigate(location.pathname);
      // history.push(location.pathname);
      // }
      // }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default SiderLayout;
