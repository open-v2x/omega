import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import imgMapBg from '#/assets/images/map_bg.jpg';
import RoadImage from './RoadImage';
import { PageLoading } from '@ant-design/pro-components';
import { getBitmap } from '#/services/api/config/crossing';

const RoadMap: React.FC<{ nodeId: string; intersectionCode: string; id: string }> = ({
  nodeId,
  intersectionCode,
  id,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMapBg = async () => {
    try {
      const bitmap = await getBitmap(id);
      if (bitmap) {
        let blob = new Blob([bitmap], { type: 'image/jpeg' });
        const bitmapUrl = window.URL.createObjectURL(blob);
        setImageUrl(bitmapUrl);
      }
    } catch (error) {
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapBg();
  }, [id]);

  return loading ? (
    <PageLoading />
  ) : (
    <div className={styles['map-wrapper']}>
      <div className={styles.box}>
        <img className={styles['box-map']} src={imageUrl ? imageUrl : imgMapBg} alt="" />
        <RoadImage nodeId={nodeId} intersectionCode={intersectionCode} />
      </div>
    </div>
  );
};

export default RoadMap;
