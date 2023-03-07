import React, { FC, useEffect } from 'react';
import { Navigate, RouteProps, useLocation, useNavigate } from 'react-router';
import { useUserStore } from '#/store/user';
import { getToken } from '#/utils/storage';
import { useMenuStore } from '#/store/menu';
import { getModelDefault } from '#/services/api/center/site';
import { PageLoading } from '@ant-design/pro-components';

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const { fetchUserInfo } = useUserStore();
  const { fetchMenus } = useMenuStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, [getToken()]);

  fetchMenus(location.pathname);

  const initModelDefault = async () => {
    if (location.pathname === '/center/model') {
      const { intersectionCode, intersectionID, nodeID } = await getModelDefault();
      navigate(`/center/map?type=1&code=${intersectionCode}&id=${intersectionID}&nodeId=${nodeID}`);
    }
  };

  useEffect(() => {
    initModelDefault();
  }, [location.pathname]);

  return getToken() ? (
    location.pathname === '/center/model' ? (
      <PageLoading />
    ) : (
      <div>{children}</div>
    )
  ) : (
    <Navigate to="/user/login" />
  );
};

export default PrivateRoute;
