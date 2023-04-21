import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import RoadImage from './RoadImage';
import { PageLoading } from '@ant-design/pro-components';
import { getBitmap } from '#/services/api/config/crossing';
import { getMqttConfig } from '#/services/api/system/edge';

const RoadMap: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [mqtt, setMqtt] = useState<{ username: string; password: string }>();

  const fetchMapBg = async () => {
    try {
      // mapId 只有 1
      const bitmap = await getBitmap(1);
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

  const getConfig = async () => {
    const result = await getMqttConfig();
    setMqtt(result);
  };

  useEffect(() => {
    getConfig();
    fetchMapBg();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <div className={styles['map-wrapper']}>
      <div className={styles.box}>
        {imageUrl && <img className={styles['box-map']} src={imageUrl} alt="" />}
        {mqtt && <RoadImage username={mqtt.username} password={mqtt.password} />}
      </div>
    </div>
  );
};

export default RoadMap;
