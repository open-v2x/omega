import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { fetchCreateVersion, fetchModule } from '#/services/api/algorithm';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React, { useCallback, useEffect, useState } from 'react';

const CreateAlgoVersionModal: React.FC<CreateModalProps> = ({
  editInfo,
  isDetails = false,
  success,
}) => {
  const [data, setData] = useState<any[]>();
  const [modules, setModules] = useState<string[]>([]);
  const [algos, setAlgos] = useState<string[]>([]);

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
          options: modules,
          fieldProps: {
            onSelect: value => {
              const ags = data.find(d => d.module === value);
              setAlgos(ags?.algo || []);
            },
          },
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
          name: 'algo',
          label: t('Algorithm Name'),
          disabled: isDetails && algos.length > 0,
          options: algos,
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

  const getModule = useCallback(async () => {
    const result = await fetchModule();
    const ms = result.map(r => r.module);
    setData(result);
    setModules(ms);
  }, []);

  useEffect(() => {
    getModule();
  }, []);

  return (
    <Modal
      title={isDetails ? t('Edit Algorithm Version') : t('Add Algorithm Version')}
      createTrigger={t('Add Algorithm Version')}
      editTrigger={isDetails ? t('Details') : ''}
      modalProps={{ className: 'overflow' }}
      submitForm={async values => {
        await fetchCreateVersion(values);
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
