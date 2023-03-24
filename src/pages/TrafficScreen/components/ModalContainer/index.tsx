import { CloseOutlined, FullscreenOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.module.less';

interface ModalContainerProps {
  component: React.ReactNode;
  show: boolean;
  fullscreenCallback: () => void;
  closeCallback: () => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  show,
  fullscreenCallback,
  closeCallback,
  component: Comp,
}) =>
  show ? (
    <div className={styles['modal-container']}>
      <div className={styles['modal-actions']}>
        <FullscreenOutlined onClick={fullscreenCallback} />
        <CloseOutlined onClick={closeCallback} />
      </div>
      <div className={styles['modal-content']}>{Comp}</div>
    </div>
  ) : null;

export default ModalContainer;
