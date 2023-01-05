import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useUserStore } from '#/store/user';
import { getToken } from '#/utils/storage';
import { useMenuStore } from '#/store/menu';

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
