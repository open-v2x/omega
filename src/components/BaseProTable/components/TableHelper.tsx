import React from 'react';
import styles from './helper.module.less';

export const renderNameAndNo = (name: string, no: string | number) => (
  <div className={styles['column-container']}>
    <div className={styles['column-name']}>{name}</div>
    <div className={styles['column-no']}>{no}</div>
  </div>
);
