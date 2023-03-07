import React from 'react';
import { Button } from 'antd';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { useRequestStore } from '#/store/request';
import Modal from '../Modal';
import { copyMaintenanceConfig } from '#/services/api/config/maintenance';
import FormItem from '../FormItem';

type CreateSendModalProps = CreateModalProps & {
  id: number;
};

const CreateSendModal: React.FC<CreateSendModalProps> = ({ id, success }) => {
  const { fetchDeviceListInModal } = useRequestStore();
  const formItems: FormGroupType[] = [
    {
      key: 'rsus',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsus',
          label: t('RSU'),
          request: fetchDeviceListInModal,
          fieldProps: { mode: 'multiple' },
          rules: [{ required: true, message: t('Please select an RSU device') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Copy configuration')}
      trigger={
        <Button id="sendRSU" type={'link'}>
          {t('Copy')}
        </Button>
      }
      width={500}
      modalProps={{ maskClosable: false }}
      submitForm={async values => {
        await copyMaintenanceConfig(id, values);
        success();
      }}
      successMsg={t('{{value}} successfully', {
        value: t('Copy configuration'),
      })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateSendModal;
