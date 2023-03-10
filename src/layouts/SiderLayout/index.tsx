import { useMenuStore } from '#/store/menu';
import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';
import GlobalHeader from '#/components/Layout/GlobalHeader';
import GlobalSetting from '#/components/GlobalSetting';
import GlobalHint from '#/components/GlobalSetting/GlobalHint';
import { useRootStore } from '#/store/root';
import GlobalMenu from '#/components/Layout/GlobalMenu';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { PageLoading } from '@ant-design/pro-components';

const SiderLayout: FC = () => {
  const menuStore = useMenuStore();
  const reload = useRootStore(state => state.reload);
  const { setReload } = useRootStore();

  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        setReload(false);
      }, 0);
    }
  }, [reload]);

  const toggle = useMenuStore(state => state.toggle);

  const init = async () => {
    menuStore.fetchFavoriteMenus();
    menuStore.fetchRightMenus();
  };

  useEffect(() => {
    init();
  }, [menuStore.menus]);

  return (
    <Layout className={styles['layout-container']}>
      <div className={styles['header-container']}>
        <GlobalHeader navItems={[]} isAdminPage={false} />
      </div>
      <Layout className={styles['box-container']}>
        <Sider
          className={styles['menu-container']}
          collapsed={toggle}
          width={246}
          collapsedWidth={56}
          theme={'light'}
        >
          <GlobalMenu />
          <div
            className={styles['menu-toggle']}
            onClick={() => useMenuStore.setState({ toggle: !toggle })}
          >
            <div className={styles['menu-toggle-c']}>
              {toggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
        </Sider>
        <Content className={styles['content-container']}>
          {reload ? <PageLoading /> : <Outlet />}
        </Content>
      </Layout>
      <GlobalSetting />
      <GlobalHint />
    </Layout>
  );
};

export default SiderLayout;
