import { Breadcrumb } from 'antd';
import React from 'react';
import { useLocation } from 'react-router';
import { useMenuStore } from '#/store/menu';

const BaseBreadcrumb: React.FC = () => {
  const location = useLocation();
  const { getBreadcrumb } = useMenuStore();

  return (
    <Breadcrumb>
      {getBreadcrumb(location.pathname).map(breadcrumb => (
        <Breadcrumb.Item key={breadcrumb.path}>{t(breadcrumb.breadcrumbName)}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BaseBreadcrumb;
