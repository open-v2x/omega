import React, { FC } from 'react';
import { Outlet } from 'react-router';
import styles from './index.module.less';

const BlankLayout: FC = () => (
  <div className={styles['qiankun-container']}>
    <Outlet />
  </div>
);

export default BlankLayout;
