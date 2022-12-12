import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './index.module.less';

export default function index(props: { children: ReactNode }) {
  const { children } = props;
  return <div className={classNames(styles['cloud-platform-bg'], 'f-column')}>{children}</div>;
}
