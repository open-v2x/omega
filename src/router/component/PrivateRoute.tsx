import React, { FC, useEffect } from 'react';
import { RouteProps, useNavigate } from 'react-router';
import { useUserStore } from '#/store/user';
import { useMenuStore } from '#/store/menu';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { fetchUserInfo, fetchTokenByIam } = useUserStore();
  const userInfo = useUserStore(state => state.userInfo);
  const { fetchMenus } = useMenuStore();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (!userInfo.username) {
      if (window.__POWERED_BY_QIANKUN__) {
        await fetchTokenByIam();
      }
      const res = await fetchUserInfo();
      fetchMenus();
      if (!res.username) {
        navigate('/user/login', { replace: true });
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <div>{children}</div>;
};

export default PrivateRoute;
