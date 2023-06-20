import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import {
  fetchCreateServiceList,
  fetchUpdateServiceList,
  getServiceTypes,
} from '#/services/api/algorithm/service';
import { CreateModalProps } from '#/typings/pro-component';
import React, { FC } from 'react';

const CreateServiceList: FC<CreateModalProps> = ({ editId, editInfo, success }) => {
  const formItems = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('{{value}} Name', { value: t('Algorithm Service') }),
          fieldProps: { maxLength: 100 },
          rules: [
            {
              required: true,
              message: t('Please enter {{value}}', {
                value: t('{{value}} Name', { value: t('Algorithm Service') }),
              }),
            },
          ],
        },
        {
          type: 'select',
          name: 'type_id',
          label: t('{{value}} Name', { value: t('Algorithm Service Type') }),
          request: getServiceTypes,
        },
      ],
    },
    {
      key: 'vendor',
      children: [
        {
          name: 'vendor',
          label: t('Algorithm Service Support'),
          fieldProps: { maxLength: 64 },
          tooltip: t('RSU_NAME_TIP'),
          rules: [
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'desc',
      children: [
        {
          name: 'description',
          type: 'textarea',
          width: 912,
          label: t('Describe'),
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];

  return (
    <Modal
      title={
        editInfo
          ? t('Edit {{value}}', { value: t('Algorithm Service') })
          : t('Create {{value}}', { value: t('Algorithm Service') })
      }
      createTrigger={t('Add {{value}}', { value: t('Algorithm Service') })}
      editTrigger=""
      submitForm={async (values: Algorithm.ServiceItem) => {
        if (editId) {
          await fetchUpdateServiceList(editId, values);
        } else {
          await fetchCreateServiceList(values);
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

export default CreateServiceList;
