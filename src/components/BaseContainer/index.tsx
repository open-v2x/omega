import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type BaseContainerType = {
  children: React.ReactNode;
  back?: boolean;
  disablePage?: boolean;
};

/**
 * @description: you can use the page container by default or do everything by yourself.
 */
const BaseContainer: FC<BaseContainerType> = ({ children, back = false, disablePage = false }) => {
  const navigate = useNavigate();

  const onBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  return disablePage ? (
    <>{children}</>
  ) : (
    <PageContainer
      header={{ breadcrumb: undefined, style: { background: 'white' } }}
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
