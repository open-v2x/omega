import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useUserStore } from '#/store/user';
import { useMenuStore } from '#/store/menu';
import { getToken } from '#/utils/storage';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { fetchUserInfo } = useUserStore();
  const { fetchMenus } = useMenuStore();

  useEffect(() => {
    fetchUserInfo();
    fetchMenus();
  }, [getToken()]);

  return getToken() ? <div>{children}</div> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
