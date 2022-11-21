import React, { useCallback } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, MenuProps, Spin } from 'antd';
import { stringify } from 'querystring';
import styles from './dropdown.module.less';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { clearStorage } from '#/utils/storage';
import { useUserStore } from '#/store/user';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDropdown from './HeaderDropDown';
import qs from 'qs';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout, userInfo } = useUserStore();

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = () => {
    clearStorage();
    const { search, pathname } = location;
    const { redirect } = qs.parse(search);
    if (window.location.pathname !== '/user/login' && !redirect) {
      navigate(
        {
          pathname: '/user/login',
          search: stringify({ redirect: pathname + search }),
        },
        {
          replace: true,
        },
      );
    }
  };

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      logout();
      loginOut();
      return;
    }
    navigate(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    </span>
  );

  if (!userInfo || !userInfo.username) {
    return loading;
  }

  const menuItems: MenuProps['items'] = [
    { label: t('Logout'), key: 'logout', icon: <LogoutOutlined /> },
  ];
  return (
    <HeaderDropdown menu={{ items: menuItems, onClick: onMenuClick }}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} />
        <span className={`${styles.name} anticon`}>{userInfo.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
