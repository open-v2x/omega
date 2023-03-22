import Country from '#/components/Country';
import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import { LatReg, LngReg } from '#/constants/edge';
import {
  createCrossing,
  fetchCrossing,
  getBitData,
  getBitmap,
  updateCrossing,
  uploadBitmap,
} from '#/services/api/config/crossing';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { CloudUploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, message } from 'antd';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import React, { FC, useState } from 'react';

// MAP 数据文件上传组件的 label 属性
const UploadLabel: React.FC = () => (
  <div>
    {t('MAP Data File Upload')}
    <span style={{ color: '#000000', marginLeft: '8px' }}>{t('MAP_UPLOAD_TIP')}</span>
    <Button type="link" size="small" onClick={() => window.open('/assets/file/example.json')}>
      {t('MAP data example')}
    </Button>
  </div>
);

const CreateCrossingModal: FC<CreateModalProps> = ({ editInfo, success }) => {
  const [mapData, setMapData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [bitmapName, setBitmapName] = useState('');

  // MAP 数据文件上传的 upload 组件属性
  const UploadFieldProps = {
    accept: 'application/json',
    maxCount: 1,
    beforeUpload: (file: RcFile) => {
      if (file.type !== 'application/json') {
        message.warn(t('MAP data files only support .json format'));
        setMapData(null);
        // 返回 Upload.LIST_IGNORE，列表中将不展示此文件
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setMapData(JSON.parse(reader.result as string));
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
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t('Upload')}</div>
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const formItems: FormGroupType[] = [
    {
      key: 'crossing',
      children: [
        {
          required: true,
          name: 'name',
          label: t('Crossing Name'),
          tooltip: t('RSU_NAME_TIP'),
          rules: [
            { required: true, message: t('Please enter the intersection name') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
        },
        {
          required: true,
          name: 'code',
          label: t('Crossing Code'),
          tooltip: t('SERIAL_NUMBER_TIP'),
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
    {
      key: 'data',
      children: [
        {
          type: 'uploadButton',
          required: editInfo?.id ? false : true,
          width: 912,
          name: 'data',
          label: <UploadLabel />,
          rules: [
            { required: editInfo?.id ? false : true, message: t('Please upload a MAP data file') },
          ],
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
              key="bitmap"
              required={editInfo?.id ? false : true}
              name={'bitmapFilename'}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label={t('Upload Bitmap')}
              rules={[
                {
                  required: editInfo?.id ? false : true,
                  message: t('Please upload a Bitmap image'),
                },
              ]}
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
      title={editInfo ? t('Edit Crossing') : t('Create Crossing')}
      createTrigger={t('Add Crossing')}
      modalProps={{ className: 'overflow' }}
      submitForm={async ({ province, ...values }: Config.CreateCrossingParams) => {
        values.areaCode = province.pop()!;
        if (mapData) {
          values.mapData = mapData;
        }
        if (bitmapName) {
          values.bitmapFilename = bitmapName;
        }
        if (editInfo) {
          await updateCrossing(editInfo.id, values);
        } else {
          await createCrossing(values);
        }
        success();
      }}
      editId={editInfo?.id}
      request={async ({ id }) => {
        const info = await fetchCrossing(id);
        const bitmap = await getBitmap(id);
        const bitData = await getBitData(id);
        let blob = new Blob([bitmap], { type: 'image/jpeg' });
        const bitmapUrl = window.URL.createObjectURL(blob);
        setImageUrl(bitmapUrl);
        setMapData(bitData);

        const { provinceCode, countryCode, cityCode, areaCode, ...rest } = info;
        const province = [countryCode!, provinceCode!, cityCode!, areaCode];

        return {
          province,
          data: bitData ? [{ uid: '1', name: 'map_data.json', status: 'done' }] : null,
          ...rest,
        };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default CreateCrossingModal;
