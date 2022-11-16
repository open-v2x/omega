import React, { FC } from 'react';
import { Outlet } from 'react-router';

const BlankLayout: FC = () => (
  <div>
    <Outlet />
  </div>
);

export default BlankLayout;
