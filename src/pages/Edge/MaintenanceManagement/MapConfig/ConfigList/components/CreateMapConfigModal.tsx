import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { downloadFile } from '#/utils';
import { Button, Form, message, Upload } from 'antd';
import React, { useState } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Country from '#/components/Country';
import { CloudUploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from '#/components/Modal';
import FormItem from '#/components/FormItem';
import {
  createMapConfig,
  mapConfigInfo,
  updateMapConfig,
  uploadBitmap,
} from '#/services/api/config/map';

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

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUploadBitmap = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [bitmapName, setBitmapName] = useState('');

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    console.log('文件状态', info.file.status);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const fetchUploadBitmap = async options => {
    const file = options.file;
    if (file) {
      try {
        const result = await uploadBitmap(file);
        const { bitmapFilename = '' } = result;
        getBase64(file, url => {
          setBitmapName(bitmapFilename);
          setImageUrl(url);
        });
      } finally {
        setLoading(false);
      }
    }
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
    {
      key: 'map',
      children: [
        {
          components: (
            <Form.Item
              required
              name={'bitmapFilename'}
              label={t('Upload Bitmap')}
              rules={[{ required: true, message: t('Please upload a Bitmap image') }]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={fetchUploadBitmap}
                beforeUpload={beforeUploadBitmap}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          ),
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
        values.bitmapFilename = bitmapName;
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
