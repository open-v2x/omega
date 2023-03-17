import React from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { CloseCircleOutlined, CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProRequestData } from '@ant-design/pro-utils';
import { Button, message } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';

type ModalProps = {
  title: string | React.ReactNode;
  submitForm: (formData: any) => Promise<boolean | void>;
  children: React.ReactNode | React.ReactNode[];
  finishFailed?: (formData: any) => void;
  trigger?: JSX.Element;
  className?: string;
  width?: number;
  omitNil?: boolean;
  modalProps?: Record<string, any>;
  layout?: FormLayout;
  createTrigger?: string;
  editTrigger?: string;
  editId?: number;
  isDetails?: boolean;
  params?: Record<string, string | number>;
  request?: ProRequestData<Record<string, any>, Record<string, any>>;
  successMsg?: string;
};

const Modal: React.FC<ModalProps> = ({
  className,
  title,
  trigger,
  createTrigger,
  editTrigger,
  width = 1000,
  omitNil = true,
  modalProps = {},
  layout = 'vertical',
  submitForm,
  finishFailed,
  editId,
  isDetails,
  params,
  request,
  successMsg,
  children,
}) => (
  <ModalForm
    className={className}
    title={title}
    trigger={
      trigger ||
      (editId ? (
        <a href="#">{editTrigger || t('Edit')}</a>
      ) : (
        <Button icon={<PlusOutlined />} type={'primary'} id={'createButton'}>
          {createTrigger}
        </Button>
      ))
    }
    width={width}
    omitNil={omitNil}
    size="large"
    layout={layout}
    modalProps={{ ...modalProps, destroyOnClose: true, maskClosable: false }}
    submitter={
      isDetails
        ? false
        : {
            searchConfig: { submitText: t('Submit'), resetText: t('Cancel') },
            resetButtonProps: {
              icon: <CloseCircleOutlined />,
              type: 'primary',
              ghost: true,
              id: 'cancelButton',
            },
            submitButtonProps: { icon: <CloudUploadOutlined />, id: 'submitButton' },
          }
    }
    onFinish={async values => {
      const status = await submitForm(values);
      if (status === false) {
        return false;
      }
      message.success(
        successMsg || t('{{value}} successfully', { value: editId ? t('Edit') : t('Added') }),
      );
      return true;
    }}
    onFinishFailed={values => finishFailed?.(values)}
    params={params || { id: editId }}
    request={params || editId ? request : undefined}
  >
    {children}
  </ModalForm>
);

export default Modal;
