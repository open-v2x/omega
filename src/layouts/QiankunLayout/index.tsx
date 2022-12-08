import React from 'react';
import { Outlet } from 'react-router';

import styles from './index.module.less';

const QiankunLayout: React.FC = () => (
  <div className={styles['qiankun-container']}>
    <Outlet />
  </div>
);

export default QiankunLayout;
