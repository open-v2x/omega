import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useUserStore } from '#/store/user';
import { useMenuStore } from '#/store/menu';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const userStore = useUserStore();
  const menuStore = useMenuStore();

  const logged = userStore.userInfo?.username ? true : false;
  useEffect(() => {
    userStore.fetchUserInfo();
    menuStore.fetchMenus();
  }, [userStore.userInfo]);

  return <div>{children}</div>;
  // return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
