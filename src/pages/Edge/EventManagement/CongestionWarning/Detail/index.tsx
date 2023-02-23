import React from 'react';
import BaseContainer from '#/components/BaseContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProCard } from '@ant-design/pro-components';
import styles from './index.module.less';
import { CongestionLevel } from '#/constants/edge';

const CongestionDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <ProCard direction="column" gutter={8} title={'基本信息'}>
        <div className={styles['basic-line']}>
          <div>
            {t('Message ID')}: {state.id}
          </div>
          <div>
            {t('laneID')}: {state.laneID}
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
            {t('The congestion start position')}: {state.startPoint.lon} , {state.startPoint.lat}
          </div>
          <div>
            {t('The congestion end position')}: {state.endPoint.lon} , {state.endPoint.lat}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Average Speed')}: {state.avgSpeed} km/h
          </div>
          <div>
            {t('Congestion Level')}: {CongestionLevel[state.cgwLevel]}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Millisecond Time')}: {state.secMark}
          </div>
          <div>
            {t('Reporting Time')}: {state.createTime}
          </div>
        </div>
      </ProCard>
    </BaseContainer>
  );
};

export default CongestionDetail;
