import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useUserStore } from '#/store/user';
import { useMenuStore } from '#/store/menu';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { fetchUserInfo, fetchTokenByIam, logged } = useUserStore();
  const { fetchMenus } = useMenuStore();

  const getUserInfo = async () => {
    if (window.__POWERED_BY_QIANKUN__) {
      await fetchTokenByIam();
    }
    await fetchUserInfo();
    fetchMenus();
  };

  useEffect(() => {
    getUserInfo();
  }, [logged]);

  return logged ? <div>{children}</div> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
