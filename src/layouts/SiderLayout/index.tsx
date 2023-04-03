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
import classNames from 'classnames';

const SiderLayout: FC = () => {
  const menuStore = useMenuStore();
  const reload = useRootStore(state => state.reload);
  const inited = useRootStore(state => state.inited);
  const rootStore = useRootStore();

  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        rootStore.setState({
          reload: false,
        });
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
      {!window.__POWERED_BY_QIANKUN__ && (
        <div className={styles['header-container']}>
          <GlobalHeader navItems={[]} isAdminPage={false} />
        </div>
      )}
      <Layout
        className={classNames(
          styles['box-container'],
          window.__POWERED_BY_QIANKUN__ ? styles['mt-50'] : '',
        )}
      >
        <Sider
          className={styles['menu-container']}
          collapsed={toggle}
          width={240}
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
          {inited && reload ? <PageLoading /> : <Outlet />}
        </Content>
      </Layout>
      <GlobalSetting />
      <GlobalHint />
    </Layout>
  );
};

export default SiderLayout;
