import React, { FC } from 'react';
import { Outlet } from 'react-router';
import QiankunLayout from '../QiankunLayout';

const BlankLayout: FC = () =>
  window.__POWERED_BY_QIANKUN__ ? (
    <QiankunLayout />
  ) : (
    <div>
      <Outlet />
    </div>
  );

export default BlankLayout;
