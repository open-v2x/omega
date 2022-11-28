import { SelectLang } from '#/components/SelectLang';
import { ProBreadcrumb } from '@ant-design/pro-components';
import React from 'react';
import AvatarDropdown from './AvatarDropDown';
import styles from './index.module.less';

export default function RightContent() {
  return (
    <div className={styles['header-content']}>
      <ProBreadcrumb />
      <div className={styles['header-right']}>
        <AvatarDropdown />
        <div className={styles.action}>
          <SelectLang />
        </div>
      </div>
    </div>
  );
}
