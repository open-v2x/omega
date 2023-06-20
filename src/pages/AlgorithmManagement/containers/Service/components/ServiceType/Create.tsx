import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { fetchCreateServiceType } from '#/services/api/algorithm/service';
import { CreateModalProps } from '#/typings/pro-component';
import React, { FC } from 'react';

const CreateServiceType: FC<CreateModalProps> = ({ success }) => {
  const formItems = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('{{value}} Name', { value: t('Algorithm Service Type') }),
          tooltip: t('Algo Service Type Hint'),
          fieldProps: { maxLength: 100 },
          rules: [
            {
              required: true,
              message: t('Please enter {{value}}', {
                value: t('{{value}} Name', { value: t('Algorithm Service Type') }),
              }),
            },
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
      title={t('Create {{value}}', { value: t('Algorithm Service Type') })}
      createTrigger={t('Add {{value}}', { value: t('Algorithm Service Type') })}
      submitForm={async (values: Algorithm.ServiceType) => {
        await fetchCreateServiceType(values);
        success();
      }}
      successMsg={t('{{value}} successfully', { value: t('Added') })}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateServiceType;
