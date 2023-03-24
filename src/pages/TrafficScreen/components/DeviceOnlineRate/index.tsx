import React, { useEffect, useState } from 'react';

import imgRsu from '#/assets/images/platform_rsu.svg';
import imgCamera from '#/assets/images/platform_camera.svg';
import imgRadar from '#/assets/images/platform_radar.svg';
import imgSpat from '#/assets/images/platform_spat.svg';
import ControlRsu from '../ControlRsu';
import ControlTable from '../ControlTable';
import classNames from 'classnames';
import styles from './index.module.less';
import { onlineRate } from '#/services/api/center/site';
import { useCenterStore } from '#/store/center';

const DeviceOnlineRate: React.FC<{ className: string }> = ({ className: cName }) => {
  const { fetchRsus, fetchCameras, fetchLidars } = useCenterStore();
  const currentRSU = useCenterStore(state => state.currentRSU);
  const [showFooterIndex, setShowFooterIndex] = useState(-1);
  const [rateInfo, setRateInfo] = useState<Center.OnlineRateItem>({
    rsu: { online: 0, offline: 0, notRegister: 0 },
    camera: { online: 0, offline: 0, notRegister: 0 },
    radar: { online: 0, offline: 0, notRegister: 0 },
    lidar: { online: 0, offline: 0, notRegister: 0 },
    spat: { online: 0, offline: 0, notRegister: 0 },
  });

  const fetchOnlineRate = async (rsuId?: number) => {
    const { data } = await onlineRate({
      rsuId,
    });
    setRateInfo(data);
  };

  useEffect(() => {
    fetchRsus();
    fetchCameras();
    fetchLidars();
    fetchOnlineRate();
    const id = setInterval(() => {
      fetchRsus();
      fetchOnlineRate();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetchCameras();
    fetchLidars();
  }, [currentRSU]);

  const handleClickItem = (index: number) => {
    setShowFooterIndex(index === showFooterIndex ? -1 : index);
  };

  const handleClickCamera = params => {
    useCenterStore.setState({
      cameraUrl: params.streamUrl,
      cloudPointUrl: undefined,
    });
  };

  const handleClickLidar = params => {
    useCenterStore.setState({
      cameraUrl: undefined,
      cloudPointUrl: params.wsUrl,
    });
  };

  const footerMap = {
    0: <ControlRsu />,
    1: (
      <ControlTable title={t('Camera Name')} dataName={'cameras'} onCallback={handleClickCamera} />
    ),
    2: <ControlTable title={t('Lidar Name')} dataName={'lidars'} onCallback={handleClickLidar} />,
  };

  const showFooter = () => footerMap[showFooterIndex];

  const onlineMaps = [
    {
      title: t('RSU online rate'),
      icon: imgRsu,
      tag: 'rsu',
      isClick: true,
      showBadge: true,
    },
    {
      title: t('Side Camera'),
      icon: imgCamera,
      tag: 'camera',
      isClick: true,
      showBadge: true,
    },
    {
      title: t('Lidar'),
      icon: imgRadar,
      tag: 'lidar',
      isClick: true,
      showBadge: true,
    },
    {
      title: t('Radar'),
      icon: imgRadar,
      tag: 'radar',
    },
    {
      title: t('SPAT'),
      icon: imgSpat,
      tag: 'spat',
    },
  ];
  return (
    <div className={classNames([styles.device, cName])}>
      <div className={classNames(styles['device-container'])}>
        <div className={styles['device-title']}>{t('Device online rate')}</div>
        <div className={styles['device-content']}>
          {onlineMaps.map((map, index) => {
            const { online = 0, offline = 0, notRegister = 0 } = rateInfo[map.tag];
            const rate = online === 0 && offline === 0 ? 0 : (online / (online + offline)) * 100;
            return (
              <div key={index} className={styles['device-item']}>
                <div className={styles['device-item-center']}>
                  <div>{map.title}</div>
                  <div
                    className={classNames(
                      styles['device-image'],
                      map.isClick ? styles['device-image-click'] : null,
                      map.showBadge && online + offline > 0 ? 'online' : 'offline',
                    )}
                    onClick={() => map.isClick && handleClickItem(index)}
                  >
                    <img className={styles['device-image-icon']} src={map.icon} alt="" />
                  </div>
                </div>
                <div>
                  {t('Online')}: {online}
                </div>
                <div>
                  {t('Offline')}: {offline}
                </div>
                <div>
                  {t('Not Registered')}: {notRegister}
                </div>
                <div>
                  {t('Online rate')}:{rate}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showFooterIndex > -1 && <div className={styles['control-container']}>{showFooter()}</div>}
    </div>
  );
};

export default DeviceOnlineRate;
