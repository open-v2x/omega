import { IRouteConfig } from '#/types/router';
import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import routes from './routes';
import WrapperRouteComponent from './WrapperRoute';

const getRouteConfig = (routeConfig: IRouteConfig): RouteObject => {
  const { path, layout, component: Comp, children, auth, redirect } = routeConfig;

  if (redirect) {
    return {
      path,
      element: <Navigate to={redirect} />,
    };
  }

  const element = <WrapperRouteComponent auth={auth} children={<Comp />} />;

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
