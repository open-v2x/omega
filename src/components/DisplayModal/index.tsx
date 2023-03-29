import { Modal } from 'antd';
import type { ReactNode } from 'react';
import React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react';
import styles from './index.module.less';
import { CloseOutlined, FullscreenExitOutlined } from '@ant-design/icons';
interface DisplayModalProps {
  component: ReactNode;
  width: number | string;
  title: ReactNode;
  footer: ReactNode | string | null;
  onCloseCallback: (() => void) | null;
  showFullscreen?: boolean;
  onFullscreenCallback?: (() => void) | null;
}

const DisplayModal = forwardRef(
  (
    {
      width,
      title,
      component,
      footer = null,
      onCloseCallback,
      showFullscreen = false,
      onFullscreenCallback,
    }: DisplayModalProps,
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    const closeModal = () => {
      setOpen(false);
      onCloseCallback?.();
    };

    const closeFullScreen = () => {
      setOpen(false);
      onFullscreenCallback?.();
    };

    useImperativeHandle(ref, () => ({
      handleShowModal: showModal,
    }));

    return (
      <Modal
        title={null}
        width={width}
        open={open}
        destroyOnClose
        onCancel={closeModal}
        footer={footer}
        closable={false}
        wrapClassName={styles['modal-container']}
      >
        <div className={styles['modal-title']}>
          <span className={styles['modal-title-text']}>{title}</span>
          <div className={styles['modal-title-actions']}>
            {showFullscreen && <FullscreenExitOutlined onClick={closeFullScreen} />}
            <CloseOutlined onClick={closeModal} />
          </div>
        </div>
        <div>{component}</div>
      </Modal>
    );
  },
);

export default DisplayModal;
