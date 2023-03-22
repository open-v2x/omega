import React from 'react';
import styles from './helper.module.less';
import { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import classNames from 'classnames';

export const renderNameAndNo = (
  name: string,
  no: string | number,
  onClickCallback?: () => void,
) => {
  const handleCopy = () => {
    const oInput = document.createElement('input');
    oInput.value = name;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    document.body.removeChild(oInput);
    message.success('Successfully copied');
  };
  return (
    <div className={styles['column-container']}>
      <div className={styles['column-name']}>
        <span
          className={classNames([
            styles['column-name-text'],
            onClickCallback ? styles['cur-p'] : '',
          ])}
          onClick={onClickCallback}
        >
          {name}
        </span>
        <CopyOutlined onClick={handleCopy} />
      </div>
      <div className={styles['column-no']}>{no}</div>
    </div>
  );
};
