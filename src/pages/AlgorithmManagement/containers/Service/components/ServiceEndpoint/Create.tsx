import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import {
  fetchCreateEndpoint,
  fetchUpdateEndpoint,
  getServiceListWithSelect,
} from '#/services/api/algorithm/service';
import { CreateModalProps } from '#/typings/pro-component';
import React, { FC } from 'react';

const TITLE = t('Algorithm Service Endpoints');

const CreateServiceEndpoint: FC<CreateModalProps> = ({ editId, editInfo, success }) => {
  const formItems = [
    {
      key: 'name',
      children: [
        {
          type: 'select',
          required: true,
          name: 'service_id',
          label: t('{{value}} Name', { value: t('Algorithm Service') }),
          tooltip: t('Algo Service Type Hint'),
          request: getServiceListWithSelect,
        },
      ],
    },
    {
      key: 'enabled',
      children: [
        {
          type: 'select',
          name: 'enabled',
          label: t('Enabled'),
          options: [
            {
              label: t('Enabled'),
              value: true,
            },
            {
              label: t('Disabled'),
              value: false,
            },
          ],
        },
      ],
    },
    {
      key: 'endpoint',
      children: [
        {
          name: 'url',
          label: TITLE,
          fieldProps: { maxLength: 100 },
        },
      ],
    },
  ];

  return (
    <Modal
      title={
        editId ? t('Edit {{value}}', { value: TITLE }) : t('Create {{value}}', { value: TITLE })
      }
      createTrigger={t('Add {{value}}', { value: TITLE })}
      editTrigger=""
      submitForm={async (values: Algorithm.ServiceEndpoint) => {
        if (editId) {
          await fetchUpdateEndpoint(editId, values);
        } else {
          await fetchCreateEndpoint(values);
        }
        success();
      }}
      editId={editInfo?.id || editId}
      successMsg={t('{{value}} successfully', { value: editId ? t('Edit') : t('Added') })}
      request={async () => editInfo}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateServiceEndpoint;
