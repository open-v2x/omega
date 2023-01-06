/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { routeInfo } from '#/services/api/center/site';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

import imgVehicle from '#/assets/images/platform_vehicle.png';
import imgSpeed from '#/assets/images/platform_speed.png';
import imgPedestrian from '#/assets/images/platform_pedestrian.png';
import imgCongestion from '#/assets/images/platform_congestion.png';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React from 'react';

// 路口信息
const IntersectionInformation: React.FC<{ code: string }> = ({ code }) => {
  const [show, setShow] = useState(true);
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

  const intersectionStyle = (style = styles['intersection-number']) =>
    classNames(style, styles['f-middle']);
  const congestionMap = {
    'free flow': t('Free flow'),
    congestion: t('Congestion'),
  };
  const intersectionMap = [
    {
      icon: imgVehicle,
      name: t('Vehicles (unit)'),
      value: info.vehicleTotal || 0,
      style: intersectionStyle(),
    },
    {
      icon: imgSpeed,
      name: t('Average speed (km/h)'),
      value: info.averageSpeed || 0,
      style: intersectionStyle(),
    },
    {
      icon: imgPedestrian,
      name: t('Pedestrians'),
      value: info.pedestrianTotal || 0,
      style: intersectionStyle(),
    },
    {
      icon: imgCongestion,
      name: t('Congestion situation'),
      value: congestionMap[info.congestion] || '',
      style: intersectionStyle(styles['intersection-value']),
    },
  ];
  return (
    <div className={classNames(styles.intersection, show ? styles.show : styles.hide)}>
      <a className={styles['right-icon']} onClick={() => setShow(!show)}>
        {show ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </a>
      <div className={styles['rate-title']}>{t('Intersection information')}</div>
      <div className={styles.wrapper}>
        {intersectionMap.map(({ icon, name, value, style }) => (
          <div key={name as string} className={styles['information-item']}>
            <div className={classNames(styles['intersection-icon'], styles['f-middle'])}>
              <img className={styles['intersection-icon-image']} src={icon} />
            </div>
            <div className={styles['intersection-name']}>{name}：</div>
            <div className={style}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntersectionInformation;
