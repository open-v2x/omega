import BaseContainer from '#/components/BaseContainer';
import { ProCard } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { useParams } from 'react-router-dom';
import { getBitmap } from '#/services/api/config/crossing';

const BitmapPreview: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const { id } = useParams();

  const getMap = useCallback(async () => {
    const bitmap = await getBitmap(+id);
    if (bitmap) {
      let blob = new Blob([bitmap], { type: 'image/jpeg' });
      const bitmapUrl = window.URL.createObjectURL(blob);
      setImageUrl(bitmapUrl);
    }
  }, [id]);
  useEffect(() => {
    getMap();
  }, []);

  return (
    <BaseContainer back>
      <ProCard className={styles.preview}>
        <div className={styles['preview-bitmap']}>
          <img src={imageUrl} alt="" />
        </div>
      </ProCard>
    </BaseContainer>
  );
};
export default BitmapPreview;
