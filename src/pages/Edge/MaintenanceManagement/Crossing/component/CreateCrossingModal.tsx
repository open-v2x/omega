import Country from '#/components/Country';
import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { LatReg, LngReg } from '#/constants/edge';
import { createCrossing, updateCrossing } from '#/services/api/config/crossing';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React, { FC } from 'react';

const CreateCrossingModal: FC<CreateModalProps> = ({ editInfo, success }) => {
  const formItems: FormGroupType[] = [
    {
      key: 'crossing',
      children: [
        {
          required: true,
          name: 'name',
          label: t('Crossing Name'),
          rules: [
            { required: true, message: t('Please enter the intersection name') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'code',
          label: t('Crossing Code'),
          rules: [
            { required: true, message: t('Please enter the intersection code') },
            { pattern: /^[a-zA-Z0-9_]+$/, message: t('SERIAL_NUMBER_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'area',
      children: [
        {
          required: true,
          name: 'province',
          components: (
            <Country
              key="area"
              required
              width="lg"
              label={t('Crossing Area')}
              name="province"
              params={{ cascade: true, needIntersection: false }}
              rules={[{ required: true, message: t('Please select an installation area') }]}
            />
          ),
        },
      ],
    },
    {
      key: 'longitude',
      children: [
        {
          required: true,
          name: 'lng',
          label: t('Longitude'),
          rules: [
            { required: true, message: t('Please enter longitude') },
            { pattern: LngReg, message: t('Incorrect longitude format') },
          ],
        },
        {
          required: true,
          name: 'lat',
          label: t('Latitude'),
          rules: [
            { required: true, message: t('Please enter latitude') },
            { pattern: LatReg, message: t('Incorrect latitude format') },
          ],
        },
      ],
    },
  ];

  return (
    <Modal
      title={editInfo ? t('Edit Crossing') : t('Create Crossing')}
      createTrigger={t('Add Crossing')}
      modalProps={{ className: 'overflow' }}
      submitForm={async ({ province, ...values }: Config.CreateCrossingParams) => {
        values.areaCode = province.pop()!;
        if (editInfo) {
          await updateCrossing(editInfo.id, values);
        } else {
          await createCrossing(values);
        }
        success();
      }}
      editId={editInfo?.id}
      request={async () => {
        const { provinceCode, countryCode, cityCode, areaCode, ...rest } = editInfo;
        const province = [countryCode!, provinceCode!, cityCode!, areaCode];

        return { province, ...rest };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateCrossingModal;
