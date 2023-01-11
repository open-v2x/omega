import { menuList } from '#/router/menus';
import { useMenuStore } from '#/store/menu';
import { useRootStore } from '#/store/root';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { FC } from 'react';
import { matchRoutes } from 'react-router';

type BaseContainerType = {
  children: React.ReactNode;
  back?: boolean;
  disablePage?: boolean;
};

const QIANKUN_PRE = 'omega';

/**
 * @description: you can use the page container by default or do everything by yourself.
 */
const BaseContainer: FC<BaseContainerType> = ({ children, back = false, disablePage = false }) => {
  const { history } = useRootStore();
  // const { menus } = useMenuStore();
  const onBack = () => {
    history.back();
  };
  const getCurrentMenuName = (pathname: string) =>
    pathname.startsWith(`/${QIANKUN_PRE}/`)
      ? pathname.substring(QIANKUN_PRE.length + 1, pathname.length)
      : pathname;
  const [{ route }] = matchRoutes(menuList, getCurrentMenuName(history.location.pathname));

  return disablePage ? (
    <>{children}</>
  ) : (
    <PageContainer
      header={{ breadcrumb: undefined, style: { background: 'white' }, title: t(route.name) }}
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
