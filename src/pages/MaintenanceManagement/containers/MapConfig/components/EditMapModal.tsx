import FormItem from '#/components/FormItem';
import Modal from '#/components/Modal';
import {
  getBitData,
  getBitmap,
  getMapDetail,
  updateMapDetail,
  uploadBitmap,
} from '#/services/api/config/crossing';
import { CreateModalProps, FormGroupType } from '#/typings/pro-component';
import { CloudUploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, message } from 'antd';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import React, { useState } from 'react';

// MAP 数据文件上传组件的 label 属性
const UploadLabel: React.FC = () => (
  <div>
    {t('MAP Data File Upload')}
    <span style={{ color: '#000000', marginLeft: '8px' }}>{t('MAP_UPLOAD_TIP')}</span>
    <a target="_blank" href="/assets/file/example.json">
      {t('MAP data example')}
    </a>
  </div>
);

const EditMapModal: React.FC<CreateModalProps> = ({ editId, success }) => {
  const [mapData, setMapData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [bitmapFilename, setBitmapFilename] = useState('');

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
        try {
          const data = JSON.parse(reader.result as string);
          setMapData(data);
        } catch (error) {
          setMapData(null);
          // message.error('MAP 数据文件内容不符合数据规范，请重新检查后上传！');
        }
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
        const { bitmapFilename: bfn = '' } = result;
        getBase64(file, url => {
          setBitmapFilename(bfn);
          setImageUrl(url);
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const normFile = (e: any) => {
    console.log('normFile', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const formItems: FormGroupType[] = [
    {
      key: 'map',
      children: [
        {
          required: true,
          name: 'name',
          label: t('MAP Name'),
          tooltip: t('RSU_NAME_TIP'),
          rules: [
            { required: true, message: t('Please enter the intersection name') },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, message: t('RSU_NAME_VALIDATE_MSG') },
          ],
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
              key="bitmap"
              name="bitmapFilename"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label={t('Upload Bitmap')}
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
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: '100%', height: '100px', overflow: 'hidden' }}
                  />
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
      title={t('Edit MAP configuration')}
      editId={editId}
      editTrigger={t('Edit')}
      modalProps={{ className: 'overflow' }}
      submitForm={async (values: Config.MapConfigParams) => {
        if (mapData) {
          values.data = mapData;
        }
        if (bitmapFilename) {
          values.bitmapFilename = bitmapFilename;
        }
        await updateMapDetail(editId, values);
        success();
      }}
      request={async () => {
        const info = await getMapDetail(editId);
        const bitmap = await getBitmap(editId);
        const bitData = await getBitData(editId);
        let blob = new Blob([bitmap], { type: 'image/jpeg' });
        const bitmapUrl = window.URL.createObjectURL(blob);
        setImageUrl(bitmapUrl);
        setMapData(bitData);

        return {
          data: bitData ? [{ uid: '1', name: 'map_data.json', status: 'done' }] : null,
          ...info,
        };
      }}
    >
      <FormItem items={formItems} />
    </Modal>
  );
};

export default EditMapModal;
