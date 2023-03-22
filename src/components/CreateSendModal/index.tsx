import React from 'react';
import { Button } from 'antd';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { useRequestStore } from '#/store/request';
import Modal from '../Modal';
import { copyMaintenanceConfig } from '#/services/api/config/maintenance';
import FormItem from '../FormItem';
import { PlusOutlined } from '@ant-design/icons';
import { postIssuedRsus } from '#/services/api/config/map';

type CreateSendModalProps = CreateModalProps & {
  type: 'map' | 'rsu';
  id: number;
};

const CreateSendModal: React.FC<CreateSendModalProps> = ({ type, id, success }) => {
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
      title={type === 'map' ? t('Add the issued RSU') : t('Copy configuration')}
      trigger={
        <Button
          id="sendRSU"
          icon={type === 'map' ? <PlusOutlined /> : ''}
          type={type === 'map' ? 'primary' : 'link'}
        >
          {type === 'map' ? t('Down') : t('Copy')}
        </Button>
      }
      width={500}
      modalProps={{ maskClosable: false }}
      submitForm={async values => {
        await { map: postIssuedRsus, rsu: copyMaintenanceConfig }[type]?.(id, values);
        success();
      }}
      successMsg={t('{{value}} successfully', {
        value: type === 'map' ? t('Delivered') : t('Copy configuration'),
      })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateSendModal;
