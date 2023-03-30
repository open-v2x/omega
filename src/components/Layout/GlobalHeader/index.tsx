import { getPath } from '#/utils/path';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import RightContent from '../HeaderRightContent';
import styles from './index.module.less';
import GlobalNav from '../GlobalNav';
export interface GlobalHeaderProps {
  navItems: any[];
  isAdminPage: boolean;
}

export default function GlobalHeader(props: GlobalHeaderProps) {
  const { isAdminPage = false } = props;

  const getRouteName = routeName => (isAdminPage ? `${routeName}Admin` : routeName);

  const getRoutePath = (routeName, params = {}, query = {}) => {
    const realName = getRouteName(routeName);
    return getPath({ key: realName, params, query });
  };

  const renderLogo = () => {
    const homeUrl = getRoutePath('/');
    return (
      <div className={classnames(styles.logo)}>
        <Link to={homeUrl}>
          <img
            src={'/omega-portal/assets/img/logo.png'}
            alt="logo"
            className={styles['logo-image']}
          />
        </Link>
      </div>
    );
  };

  const renderTitle = () => <div className={styles.title}>{t('OpenV2X')}</div>;

  return (
    <div className={styles.header}>
      <div className={styles['header-left']}>
        <GlobalNav {...props} />
        {renderLogo()}
        {renderTitle()}
      </div>
      <div className={styles['header-right']}>
        <RightContent isAdminPage={isAdminPage} />
      </div>
    </div>
  );
}
