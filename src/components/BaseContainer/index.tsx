import { useRootStore } from '#/store/root';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { FC } from 'react';
import BaseBreadcrumb from '../BaseBreadcrumb';

type BaseContainerType = {
  children: React.ReactNode;
  back?: boolean;
  disablePage?: boolean;
};

/**
 * @description: you can use the page container by default or do everything by yourself.
 */
const BaseContainer: FC<BaseContainerType> = ({ children, back = false, disablePage = false }) => {
  const { history } = useRootStore();
  const onBack = () => {
    history.back();
  };

  return disablePage ? (
    <>{children}</>
  ) : (
    <PageContainer
      header={{
        title: <BaseBreadcrumb />,
        style: {
          background: 'white',
        },
      }}
      extra={
        back
          ? [
              <Button id="backButton" key="back" onClick={onBack}>
                {t('Back')}
              </Button>,
            ]
          : []
      }
    >
      {children}
    </PageContainer>
  );
};

export default BaseContainer;
