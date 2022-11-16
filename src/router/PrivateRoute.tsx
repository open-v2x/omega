import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useUserStore } from '#/store/user';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const userStore = useUserStore();

  const logged = userStore.userInfo?.username ? true : false;
  useEffect(() => {
    userStore.fetchUserInfo();
  }, [userStore.userInfo]);

  return <div>{children}</div>;
  // return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
