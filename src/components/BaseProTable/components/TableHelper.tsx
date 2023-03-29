import React from 'react';
import styles from './helper.module.less';
import { CopyOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import classNames from 'classnames';
import { confirmModal } from '#/components/ConfirmModal';
import { ActionType } from '@ant-design/pro-components';

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

export const renderEnableBtn = (
  id: number,
  enabled: boolean,
  action: (id: number, params?: any) => void,
  ref: React.MutableRefObject<ActionType | undefined>,
) => (
  <Button
    type="link"
    size="small"
    id="enabledButton"
    key="enabled"
    style={{ color: enabled ? '#E74040' : '', textAlign: 'center', display: 'inline-block' }}
    onClick={() =>
      confirmModal({
        id: id,
        params: { enabled: !enabled },
        title: enabled ? t('Disable') : t('Enable'),
        content: enabled
          ? t('Are you sure you want to disable this device?')
          : t('Are you sure you want to enable this device?'),
        successMsg: t('{{value}} successfully', { value: t('Status updated') }),
        modalFn: action,
        actionRef: ref,
      })
    }
  >
    {enabled ? t('Disable') : t('Enable')}
  </Button>
);

export const renderDeleteBtn = (
  id: number,
  action: (id: number, params?: any) => void,
  content: string,
  ref: React.MutableRefObject<ActionType | undefined>,
) => (
  <Button
    type="link"
    size="small"
    id="deleteButton"
    key="delete"
    style={{ color: '#E74040' }}
    onClick={() =>
      confirmModal({
        id: id,
        content: content,
        modalFn: action,
        actionRef: ref,
      })
    }
  >
    {t('Delete')}
  </Button>
);
