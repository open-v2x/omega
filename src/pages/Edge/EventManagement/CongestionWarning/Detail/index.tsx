import React from 'react';
import BaseContainer from '#/components/BaseContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProCard } from '@ant-design/pro-components';
import styles from './index.module.less';
import { CongestionLevel } from '#/constants/edge';
import LonLatUnit from '#/components/LonLatUnit';
import { formatSpeed } from '#/constants/direction';

const CongestionDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <ProCard direction="column" gutter={8} title={t('Basic Information')}>
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
            {t('SensorLongtitude')}: {<LonLatUnit data={state.sensorPos.lon} />}
          </div>
          <div>
            {t('SensorLatitude')}: {<LonLatUnit data={state.sensorPos.lat} />}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('The congestion start position')}: {<LonLatUnit data={state.startPoint.lon} />} ,
            {<LonLatUnit data={state.startPoint.lat} />}
          </div>
          <div>
            {t('The congestion end position')}: {<LonLatUnit data={state.endPoint.lon} />} ,
            {<LonLatUnit data={state.endPoint.lat} />}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Average Speed')}: {formatSpeed(state.avgSpeed)}
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
