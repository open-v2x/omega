import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { updateSystemConfig } from '#/services/api/system/edge';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { Button } from 'antd';
import React from 'react';

const UpdateSiteNameModal: React.FC<CreateModalProps & { name: string }> = ({
  name = '',
  success,
}) => {
  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('Edge Site Name'),
          rules: [{ required: true, message: t('Please enter an edge site name') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Modify edge site name')}
      trigger={
        <Button id="siteName" type="primary" style={{ width: '94px' }}>
          {t('Modify')}
        </Button>
      }
      width={500}
      modalProps={{ maskClosable: false }}
      submitForm={async values => {
        await updateSystemConfig(values);
        success();
      }}
      successMsg={t('{{value}} successfully', { value: t('Modify') })}
      params={{ name }}
      request={async () => ({ name })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default UpdateSiteNameModal;
