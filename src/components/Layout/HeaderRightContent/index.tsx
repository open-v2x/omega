import { ProBreadcrumb } from '@ant-design/pro-components';
import React from 'react';
import AvatarDropdown from './AvatarDropDown';
import styles from './index.module.less';

export default function RightContent(props: { isAdminPage: boolean }) {
  return (
    <div className={styles['header-content']}>
      <ProBreadcrumb />
      <AvatarDropdown />
    </div>
  );
}
