import { routeInfo } from '#/services/api/center/site';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

import React from 'react';

// 路口信息
const IntersectionInformation: React.FC<{ code: string }> = ({ code }) => {
  const [info, setInfo] = useState<Center.RouteInfoItem>({
    vehicleTotal: 0,
    averageSpeed: 0,
    pedestrianTotal: 0,
    congestion: '',
  });

  const fetchRouteInfo = async () => {
    const res = await routeInfo({ intersectionCode: code });
    setInfo(res);
  };

  useEffect(() => {
    fetchRouteInfo();
    const id = setInterval(() => fetchRouteInfo(), 5000);
    return () => clearInterval(id);
  }, []);

  const congestionMap = {
    'free flow': t('Free flow'),
    congestion: t('Congestion'),
  };
  return (
    <div className={classNames(styles.intersection)}>
      <div className={styles['intersection-title']}>{t('Intersection information')}</div>
      <div>
        <div className={classNames(styles.wrapper, styles['mb-10'])}>
          <div>
            {t('Vehicles (unit)')}: {info.vehicleTotal || 0}
          </div>
          <div>
            {t('Average speed (km/h)')}: {info.averageSpeed || 0}
          </div>
        </div>
        <div className={styles.wrapper}>
          <div>
            {t('Pedestrians')}: {info.pedestrianTotal || 0}
          </div>
          <div>
            {t('Congestion situation')}: {congestionMap[info.congestion] || ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntersectionInformation;
