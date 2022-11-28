import React, { FC } from 'react';
import { RouteProps } from 'react-router';
import PrivateRoute from './PrivateRoute';

export type WrapperRouteProps = RouteProps & {
  /** authorization？ */
  auth?: boolean;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, children }) => {
  if (auth) {
    return <PrivateRoute>{children}</PrivateRoute>;
  }
  return <>{children}</>;
};

export default WrapperRouteComponent;
