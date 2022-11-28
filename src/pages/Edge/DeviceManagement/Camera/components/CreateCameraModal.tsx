import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { LatReg, LngReg } from '#/constants/edge';
import { createCamera, updateCamera } from '#/services/api/device/camera';
import { useRequestStore } from '#/store/request';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import React from 'react';

const CreateCameraModal: React.FC<CreateModalProps> = ({
  editInfo,
  isDetails = false,
  success,
}) => {
  const { fetchDeviceListInModal } = useRequestStore();

  const lowerType = t('camera');
  const upperType = t('Camera');

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
          name: 'sn',
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
      key: 'streamUrl',
      children: [
        {
          required: true,
          width: 912,
          name: 'streamUrl',
          label: t('Video Stream URL'),
          disabled: isDetails,
          rules: [
            {
              required: true,
              message: t('Please enter video stream URL'),
            },
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
          disabled: isDetails,
          rules: [
            { required: true, message: t('Please enter longitude') },
            { pattern: LngReg, message: t('Incorrect longitude format') },
          ],
        },
        {
          required: true,
          name: 'lat',
          label: t('Latitude'),
          disabled: isDetails,
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
          disabled: isDetails,
          min: Number.MIN_SAFE_INTEGER,
          fieldProps: { precision: 2 },
          rules: [{ required: true, message: t('Please enter altitude') }],
        },
        {
          type: 'digit',
          required: true,
          name: 'towards',
          label: t('Orientation (°)'),
          disabled: isDetails,
          fieldProps: { precision: 2, max: 359.99 },
          rules: [{ required: true, message: t('Please enter an orientation') }],
        },
      ],
    },
    {
      key: 'rsuId',
      children: [
        {
          type: 'select',
          required: true,
          name: 'rsuId',
          label: t('Associate RSU'),
          disabled: isDetails,
          request: fetchDeviceListInModal,
          rules: [{ required: true, message: t('Please select an associated RSU') }],
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
      submitForm={async values => {
        if (editInfo) {
          await updateCamera(editInfo.id, values);
        } else {
          await createCamera(values);
        }
        success();
      }}
      editId={editInfo?.id}
      isDetails={isDetails}
      request={async () => {
        const { name, sn, streamUrl, lng, lat, elevation, towards, rsuId, desc } = editInfo!;
        return { name, sn, streamUrl, lng, lat, elevation, towards, rsuId, desc };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateCameraModal;
