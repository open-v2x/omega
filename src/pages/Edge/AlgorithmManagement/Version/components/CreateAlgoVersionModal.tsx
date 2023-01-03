import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { AlgorithmModuleOptions } from '#/constants/edge';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React from 'react';

const CreateAlgoVersionModal: React.FC<CreateModalProps> = ({
  editInfo,
  isDetails = false,
  success,
}) => {
  const formItems: FormGroupType[] = [
    {
      key: 'module',
      children: [
        {
          type: 'select',
          required: true,
          name: 'module',
          label: t('Algorithm Module'),
          disabled: isDetails,
          options: AlgorithmModuleOptions,
          rules: [{ required: true, message: t('Please select a algorithm module') }],
        },
      ],
    },
    {
      key: 'name',
      children: [
        {
          type: 'select',
          required: true,
          name: 'module',
          label: t('Algorithm Name'),
          disabled: isDetails,
          request: () => [
            'complement',
            'fusion',
            'smooth',
            'visual',
            'collision_warning',
            'cooperative_lane_change',
          ],
          rules: [{ required: true, message: t('Please select a algorithm name') }],
        },
      ],
    },
    {
      key: 'version',
      children: [
        {
          required: true,
          name: 'version',
          label: t('Algorithm Version'),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter a algorithm version name') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
      ],
    },
  ];

  return (
    <Modal
      title={isDetails ? t('Edit Algorithm Version') : t('Add Algorithm Version')}
      createTrigger={t('Add Algorithm Version')}
      editTrigger={isDetails ? t('Details') : ''}
      modalProps={{ className: 'overflow' }}
      submitForm={async values => {
        console.log('新增', values);
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => editInfo}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateAlgoVersionModal;
