import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { QueryIntervalOptions, QueryTypeOptions } from '#/constants/edge';
import { createQueryInstruction } from '#/services/api/config/query';
import { useRequestStore } from '#/store/request';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import React from 'react';

const CreateQueryModal: React.FC<CreateModalProps> = ({ success }) => {
  const { fetchDeviceListInModal } = useRequestStore();
  const formItems: FormGroupType[] = [
    {
      key: 'queryType',
      children: [
        {
          type: 'select',
          required: true,
          name: 'queryType',
          label: t('Query Information Type'),
          valueEnum: statusOptionFormat(QueryTypeOptions),
          rules: [{ required: true, message: t('Please select the query information type') }],
        },
      ],
    },
    {
      key: 'timeType',
      children: [
        {
          type: 'select',
          required: true,
          name: 'timeType',
          label: t('Query Information Time Interval'),
          valueEnum: statusOptionFormat(QueryIntervalOptions),
          rules: [
            { required: true, message: t('Please select the query information time interval') },
          ],
        },
      ],
    },
    {
      key: 'rsus',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsus',
          label: t('Query RSU'),
          request: fetchDeviceListInModal,
          fieldProps: { mode: 'multiple' },
          rules: [{ required: true, message: t('Please select an RSU device') }],
        },
      ],
    },
  ];
  return (
    <Modal
      title={t('Issue RSU information query command')}
      createTrigger={t('Query command')}
      width={500}
      submitForm={async (values: Config.CreateQueryParams) => {
        await createQueryInstruction(values);
        success();
      }}
      successMsg={t('The query command was issued successfully')}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateQueryModal;
