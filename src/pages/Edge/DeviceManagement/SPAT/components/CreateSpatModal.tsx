import Country from '#/components/Country';
import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { IPReg, LightStateOptions } from '#/constants/edge';
import { createSpat, updateSpat } from '#/services/api/device/spat';
import { useRequestStore } from '#/store/request';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React from 'react';

const CreateSpatModal: React.FC<CreateModalProps> = ({ editInfo, isDetails = false, success }) => {
  const { fetchDeviceListInModal } = useRequestStore();

  const lowerType = t('spat');
  const upperType = t('SPAT');

  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('{{type}} Name', { type: upperType }),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter a {{type}} name', { type: lowerType }) },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'intersectionId',
          label: t('{{type}} Serial Number', { type: upperType }),
          tooltip: t('SERIAL_NUMBER_TIP'),
          fieldProps: { maxLength: 64 },
          disabled: isDetails,
          rules: [
            {
              required: true,
              message: t('Please enter the {{type}} serial number', { type: lowerType }),
            },
            { pattern: /^[a-zA-Z0-9_]+$/, message: t('SERIAL_NUMBER_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'phase',
      children: [
        {
          type: 'digit',
          required: true,
          name: 'phaseId',
          label: t('PhaseId'),
          tooltip: t('SPAT_PHASE_ID_TIP'),
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please input an phase id') },
            {
              pattern: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/,
              message: t('Please enter correct phase id'),
            },
          ],
        },
        {
          type: 'select',
          required: true,
          name: 'light',
          label: t('Light State'),
          disabled: isDetails,
          options: LightStateOptions,
          rules: [{ required: true, message: t('Please select a light state') }],
        },
      ],
    },
    {
      key: 'rsuId',
      children: [
        {
          type: 'select',
          name: 'rsuId',
          label: t('Associate RSU'),
          disabled: isDetails,
          request: fetchDeviceListInModal,
        },
        {
          name: 'spatIP',
          label: t('SPAT IP'),
          disabled: isDetails,
          rules: [{ pattern: IPReg, message: t('Incorrect SPAT IP format') }],
        },
      ],
    },
    {
      key: 'position',
      children: [
        {
          name: 'point',
          label: t('Point'),
          required: true,
          disabled: isDetails,
          rules: [{ required: true, message: t('Please input an Point') }],
        },
        {
          name: 'province',
          required: true,
          components: (
            <Country
              key="province"
              required
              width="lg"
              label={t('Installation Area')}
              name="province"
              params={{ cascade: true, needIntersection: true }}
              rules={[{ required: true, message: t('Please select an installation area') }]}
            />
          ),
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
          disabled: isDetails,
          fieldProps: { autoSize: { minRows: 3, maxRows: 5 } },
        },
      ],
    },
  ];

  const modalTitle = () =>
    isDetails
      ? t('{{type}} details', { type: upperType })
      : editInfo
      ? t('Edit {{type}}', { type: lowerType })
      : t('Add {{type}}', { type: lowerType });

  return (
    <Modal
      title={modalTitle()}
      createTrigger={t('Add {{type}}', { type: lowerType })}
      editTrigger={isDetails ? t('Details') : ''}
      modalProps={{ className: 'overflow' }}
      submitForm={async ({ province, ...values }) => {
        values.intersectionCode = province!.pop()!;
        if (editInfo) {
          values.rsuId = values.rsuId || null;
          values.rsuName = values.rsuName || null;
          await updateSpat(editInfo.id, values);
        } else {
          await createSpat(values);
        }
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => {
        const { provinceCode, countryCode, cityCode, areaCode, intersectionCode } = editInfo;
        const province = [countryCode!, provinceCode!, cityCode!, areaCode!, intersectionCode!];
        return {
          province,
          ...editInfo,
        };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateSpatModal;
