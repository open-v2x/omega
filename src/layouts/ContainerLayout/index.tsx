import React from 'react';
import QiankunLayout from '../QiankunLayout';
import SiderLayout from '../SiderLayout';

const ContainerLayout: React.FC = () =>
  window.__POWERED_BY_QIANKUN__ ? <QiankunLayout /> : <SiderLayout />;

export default ContainerLayout;
