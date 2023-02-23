import BaseContainer from '#/components/BaseContainer';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const RetrogradeWarningDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <ProCard title="基本信息" direction="column" gutter={8}>
        <div className={styles['basic-line']}>
          <div>
            {t('Message ID')}: {state.id}
          </div>
          <div>
            {t('Idea ID')}: {state.egoID}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('SensorLongtitude')}: {state.sensorPos.lon}
          </div>
          <div>
            {t('SensorLatitude')}: {state.sensorPos.lat}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Retrograde Lon')}: {state.egoPos.lon}
          </div>
          <div>
            {t('Retrograde Lat')}: {state.egoPos.lat}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Speed')}: {state.speed} km/h
          </div>
          <div>
            {t('Heading')}: {state.heading}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Car`s Length')}: {state.length}
          </div>
          <div>
            {t('Car`s Width')}: {state.width}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Car`s Height')}: {state.height}
          </div>
          <div>
            {t('Millisecond Time')}: {state.secMark}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Reporting Time')}: {state.createTime}
          </div>
        </div>
      </ProCard>
    </BaseContainer>
  );
};

export default RetrogradeWarningDetail;
