import BaseContainer from '#/components/BaseContainer';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import LonLatUnit from '#/components/LonLatUnit';
import { formatHeading, formatLength, formatSpeed } from '#/constants/direction';

const OverspeedWarningDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')} direction="column" gutter={8}>
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
            {t('SensorLongtitude')}: {<LonLatUnit data={state.sensorPos.lon} />}
          </div>
          <div>
            {t('SensorLatitude')}: {<LonLatUnit data={state.sensorPos.lat} />}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Overspeed Lon')}: {<LonLatUnit data={state.egoPos.lon} />}
          </div>
          <div>
            {t('Overspeed Lat')}: {<LonLatUnit data={state.egoPos.lat} />}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Speed')}: {formatSpeed(state.speed)}
          </div>
          <div>
            {t('Heading')}: {formatHeading(state.heading)}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Car`s Length')}: {formatLength(state.length)}
          </div>
          <div>
            {t('Car`s Width')}: {formatLength(state.width)}
          </div>
        </div>
        <div className={styles['basic-line']}>
          <div>
            {t('Car`s Height')}: {formatLength(state.height)}
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

export default OverspeedWarningDetail;
