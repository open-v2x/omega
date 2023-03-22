import React, { FC, useState } from 'react';
import { Navigate, RouteProps, useLocation, useNavigate } from 'react-router';
import { useUserStore } from '#/store/user';
import { useMenuStore } from '#/store/menu';
import { getToken } from '#/utils/storage';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { fetchUserInfo, fetchTokenByIam } = useUserStore();
  const userInfo = useUserStore(state => state.userInfo);
  const { fetchMenus } = useMenuStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [init, setInit] = useState(false);

  const getUserInfo = async () => {
    if (!userInfo.username) {
      if (window.__POWERED_BY_QIANKUN__) {
        await fetchTokenByIam();
      }
      const res = await fetchUserInfo();
      if (!res.username) {
        navigate('/user/login', { replace: true });
      }
    }
    setInit(true);
  };

  if (!init) {
    getUserInfo();
  } else {
    fetchMenus(location.pathname);
  }

  return getToken() ? <div>{children}</div> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
