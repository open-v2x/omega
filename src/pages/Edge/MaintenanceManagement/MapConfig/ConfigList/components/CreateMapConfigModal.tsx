import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { downloadFile } from '#/utils';
import { Button, message, Upload } from 'antd';
import React from 'react';
import type { RcFile } from 'antd/lib/upload';
import Country from '#/components/Country';
import { CloudUploadOutlined } from '@ant-design/icons';
import Modal from '#/components/Modal';
import FormItem from '#/components/FormItem';
import { createMapConfig, mapConfigInfo, updateMapConfig } from '#/services/api/config/map';

// MAP 数据文件上传组件的 label 属性
const UploadLabel: React.FC = () => (
  <div>
    {t('MAP Data File Upload')}
    <span style={{ color: '#000000', marginLeft: '8px' }}>{t('MAP_UPLOAD_TIP')}</span>
    <Button
      type="link"
      size="small"
      onClick={() => downloadFile('/assets/file/example.json', `${t('MAP data example')}.json`)}
    >
      {t('MAP data example')}
    </Button>
  </div>
);

const CreateMapConfigModal: React.FC<CreateModalProps> = ({ editId, success }) => {
  let mapData: Record<string, any> | null = null;

  // MAP 数据文件上传的 upload 组件属性
  const UploadFieldProps = {
    accept: 'application/json',
    maxCount: 1,
    beforeUpload: (file: RcFile) => {
      if (file.type !== 'application/json') {
        message.warn(t('MAP data files only support .json format'));
        mapData = null;
        // 返回 Upload.LIST_IGNORE，列表中将不展示此文件
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        mapData = JSON.parse(reader.result as string);
      };
      return false;
    },
  };
  const formItem: FormGroupType[] = [
    {
      key: 'name',
      children: [
        {
          required: true,
          name: 'name',
          label: t('MAP Name'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a MAP name') }],
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
      key: 'address',
      children: [
        {
          required: true,
          name: 'address',
          label: t('MAP Location'),
          fieldProps: { maxLength: 64 },
          rules: [{ required: true, message: t('Please enter a MAP location') }],
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
    {
      key: 'data',
      children: [
        {
          type: 'uploadButton',
          required: true,
          width: 912,
          name: 'data',
          label: <UploadLabel />,
          rules: [{ required: true, message: t('Please upload a MAP data file') }],
          fieldProps: UploadFieldProps,
          title: t('Upload files'),
          icon: <CloudUploadOutlined />,
          max: 1,
        },
      ],
    },
  ];

  return (
    <Modal
      title={editId ? t('Edit MAP configuration') : t('Add MAP configuration')}
      createTrigger={t('Add MAP')}
      submitForm={async ({ province, ...values }) => {
        values.intersectionCode = province!.pop()!;
        values.data = mapData;
        if (editId) {
          await updateMapConfig(editId, values);
        } else {
          await createMapConfig(values);
        }
        success();
      }}
      editId={editId}
      request={async ({ id }) => {
        const data = await mapConfigInfo(id);
        const {
          name,
          areaCode,
          address,
          desc,
          countryCode,
          provinceCode,
          intersectionCode,
          cityCode,
        } = data;
        return {
          name,
          areaCode,
          address,
          desc,
          data: [true],
          province: [countryCode, provinceCode, cityCode, areaCode, intersectionCode],
        };
      }}
    >
      <FormItem items={formItem} />
    </Modal>
  );
};

export default CreateMapConfigModal;
