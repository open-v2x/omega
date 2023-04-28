import Country from '#/components/Country';
import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { createEdgeSite, updateEdgeSite } from '#/services/api/system/edge';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React from 'react';

const CreateEdgeSiteModal: React.FC<CreateModalProps> = ({ editInfo, success }) => {
  const title = t('Edge Site');

  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('Edge Site Name'),
          tooltip: t('EDGE_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a {{type}} name', { type: title }) }],
        },
        {
          name: 'province',
          components: (
            <Country
              key="province"
              width="lg"
              label={t('Installation Area')}
              name="province"
              filter={{ country: false, isCenter: true }}
              params={{ cascade: true, needIntersection: false }}
            />
          ),
        },
      ],
    },
    {
      key: 'area',
      children: [
        {
          required: true,
          name: 'edgeSiteDandelionEndpoint',
          label: t('Edge Site Endpoint'),
          tooltip: t('Edge Site Endpoint Tip'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a {{type}} url', { type: title }) }],
        },
      ],
    },
    {
      key: 'desc',
      children: [
        {
          type: 'textarea',
          width: 912,
          name: 'desc',
          label: t('Describe'),
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];

  return (
    <Modal
      title={
        editInfo ? t('Edit {{type}}', { type: title }) : t('Register {{type}}', { type: title })
      }
      createTrigger={t('Register {{type}}', { type: title })}
      editTrigger={''}
      modalProps={{ className: 'overflow' }}
      submitForm={async ({ province, ...values }) => {
        values.areaCode = province.pop();
        if (editInfo) {
          await updateEdgeSite(editInfo.id, values);
        } else {
          await createEdgeSite(values);
        }
        success();
      }}
      editId={editInfo?.id}
      request={async () => {
        const { provinceCode, cityCode, areaCode } = editInfo;

        const province = [provinceCode!, cityCode!, areaCode!];
        return { province, ...editInfo };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateEdgeSiteModal;
