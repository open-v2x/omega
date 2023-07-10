import FormField from '#/components/FormField';
import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { fetchCreateVersion, fetchModule } from '#/services/api/algorithm';
import { getEndpoints } from '#/services/api/system/service';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

const CreateAlgoVersionModal: React.FC<CreateModalProps> = ({
  editInfo,
  isDetails = false,
  success,
}) => {
  const [data, setData] = useState<any[]>();
  const [modules, setModules] = useState<string[]>([]);
  const [algos, setAlgos] = useState<string[]>([]);
  const [endpoints, setEndpoints] = useState<string[]>([]);

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
    {
      key: 'endpoint',
      children: [
        {
          components: (
            <div>
              <FormField
                items={[
                  {
                    type: 'select',
                    required: true,
                    name: 'endpointID',
                    label: t('Algorithum Service Url'),
                    disabled: isDetails && endpoints.length > 0,
                    options: endpoints,
                    fieldProps: {
                      fieldNames: {
                        label: 'url',
                        value: 'id',
                      },
                    },
                  },
                ]}
                key="endpoint"
              />
              <span>
                <Trans i18nKey={'Endpoint Hint'}>
                  text
                  <a
                    target="_blank"
                    href="https://gitee.com/open-v2x/cerebrum/blob/master/docs/cerebrum_add_external_service/cerebrum 添加外部算法.md"
                  >
                    text
                  </a>
                  text
                </Trans>
              </span>
            </div>
          ),
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

  const getData = useCallback(async () => {
    getModule();
    const endpointResult = await getEndpoints();
    const results = endpointResult?.data;
    if (results) {
      const result = endpoints.filter(item => item?.enabled);
      setEndpoints(result);
    } else {
      setEndpoints([]);
    }
  }, []);

  useEffect(() => {
    getData();
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
