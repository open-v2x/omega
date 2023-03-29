import { IRouteConfig } from '#/types/router';
import React, { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import routes from './routes';
import WrapperRouteComponent from './component/WrapperRoute';
import { PageLoading } from '@ant-design/pro-components';

const getRouteConfig = (routeConfig: IRouteConfig): RouteObject => {
  const { path, layout, component: Comp, children, auth, redirect } = routeConfig;

  const element = redirect ? (
    <Navigate to={redirect} replace />
  ) : (
    <Suspense fallback={<PageLoading />}>
      <WrapperRouteComponent auth={auth} children={<Comp />} redirect={redirect} />
    </Suspense>
  );

  let childrenRoutes: any[] = [];

  if (children) {
    childrenRoutes = children.map((it: IRouteConfig) =>
      getRouteConfig({ ...it, path: it.path.startsWith('/') ? it.path : `${path}/${it.path}` }),
    );
  }

  return layout
    ? {
        element,
        children: childrenRoutes,
      }
    : {
        path: path,
        element,
        children: childrenRoutes,
      };
};

export const getRouteConfigs = () => routes.map((route: IRouteConfig) => getRouteConfig(route));
