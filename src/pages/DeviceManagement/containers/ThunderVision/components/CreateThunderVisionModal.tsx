import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { IPReg, LatReg, LngReg } from '#/constants/edge';
import { createThunderVision, updateThunderVision } from '#/services/api/device/thunderVision';
import { useRequestStore } from '#/store/request';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React from 'react';

const CreateThunderVisionModal: React.FC<CreateModalProps> = ({ editInfo, success }) => {
  const { fetchDeviceListInModal } = useRequestStore();
  const title = t('Thunder Vision');

  const formItems: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('{{type}} Name', { type: title }),
          tooltip: t('RSU_NAME_TIP'),
          fieldProps: { maxLength: 64 },
          rules: [
            { required: true, message: t('Please enter a {{type}} name', { type: title }) },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'sn',
          label: t('{{type}} Serial Number', { type: title }),
          tooltip: t('SERIAL_NUMBER_TIP'),
          fieldProps: { maxLength: 64 },
          rules: [
            {
              required: true,
              message: t('Please enter the {{type}} serial number', { type: title }),
            },
            { pattern: /^[a-zA-Z0-9_]+$/, message: t('SERIAL_NUMBER_VALIDATE_MSG') },
          ],
        },
      ],
    },
    {
      key: 'lng',
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
    {
      key: 'elevation',
      children: [
        {
          type: 'digit',
          required: true,
          name: 'elevation',
          label: t('Altitude (m)'),
          min: Number.MIN_SAFE_INTEGER,
          fieldProps: { precision: 2 },
          rules: [{ required: true, message: t('Please enter altitude') }],
        },
        {
          type: 'digit',
          required: true,
          name: 'towards',
          label: t('Orientation (°)'),
          fieldProps: { precision: 2, max: 359.99 },
          rules: [{ required: true, message: t('Please enter an orientation') }],
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
          rules: [{ required: true, message: t('Please input an Point') }],
        },
        {
          name: 'pole',
          label: t('Pole'),
          required: true,
          rules: [{ required: true, message: t('Please input an Pole') }],
        },
      ],
    },
    {
      key: 'rsu',
      children: [
        {
          type: 'select',
          name: 'rsuID',
          label: t('Associate RSU'),
          request: fetchDeviceListInModal,
        },
        {
          required: true,
          name: 'radarCameraIP',
          label: t('Thunder Vision IP'),
          rules: [
            { required: true, message: t('Please enter Thunder Vision IP') },
            { pattern: IPReg, message: t('Incorrect Thunder Vision format') },
          ],
        },
      ],
    },
    {
      key: 'stream',
      children: [
        {
          required: true,
          name: 'videoStreamAddress',
          label: t('Video Stream Address'),
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

  const modalTitle = () =>
    editInfo ? t('Edit {{type}}', { type: title }) : t('Add {{type}}', { type: title });

  return (
    <Modal
      title={modalTitle()}
      createTrigger={t('Add {{type}}', { type: title })}
      editTrigger={''}
      modalProps={{ className: 'overflow' }}
      submitForm={async values => {
        values.rsuID = values.rsuID || null;
        if (editInfo) {
          await updateThunderVision(editInfo.id, values);
        } else {
          await createThunderVision(values);
        }
        success();
      }}
      editId={editInfo?.id}
      request={async () => editInfo}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateThunderVisionModal;
