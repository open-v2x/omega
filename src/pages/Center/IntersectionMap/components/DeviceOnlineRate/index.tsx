import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.less';
import imgRsu from '#/assets/images/platform_rsu.svg';
import imgCamera from '#/assets/images/platform_camera.svg';
import imgRadar from '#/assets/images/platform_radar.svg';
import imgSpat from '#/assets/images/platform_spat.svg';
import ControlRsu from './ControlRsu';
import { useCenterStore } from '#/store/center';
import classNames from 'classnames';
import ControlTable from './ControlTable';
import { onlineRate } from '#/services/api/center/site';

const DeviceOnlineRate: FC = () => {
  const centerStore = useCenterStore();
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
      edgeRsuId: rsuId,
      intersectionCode: centerStore.intersectionCode,
    });
    setRateInfo(data);
  };

  useEffect(() => {
    centerStore.fetchRsus();
    centerStore.fetchCameras();
    fetchOnlineRate();
    const id = setInterval(() => {
      centerStore.fetchRsus();
      fetchOnlineRate();
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    centerStore.fetchCameras();
    centerStore.fetchLidars();
  }, [centerStore.currentRSU]);

  const handleClickItem = (index: number) =>
    setShowFooterIndex(index === showFooterIndex ? -1 : index);

  const handleClickCamera = params => {
    centerStore.setShowCamera(params.streamUrl);
  };
  const handleClickLidar = params => {
    centerStore.setShowCloudPoint(params.wsUrl);
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
      online: rateInfo.rsu.online,
      offline: rateInfo.rsu.offline,
      notRegister: rateInfo.rsu.notRegister,
      isClick: true,
    },
    {
      title: t('Side Camera'),
      icon: imgCamera,
      online: rateInfo.camera.online,
      offline: rateInfo.camera.offline,
      notRegister: rateInfo.camera.notRegister,
      isClick: true,
    },
    {
      title: t('Radar'),
      icon: imgRadar,
      online: rateInfo.radar.notRegister,
      offline: rateInfo.radar.notRegister,
      notRegister: rateInfo.radar.notRegister,
      isClick: true,
    },
    {
      title: t('Lidar'),
      icon: imgRadar,
      online: rateInfo.lidar.online,
      offline: rateInfo.lidar.offline,
      notRegister: rateInfo.lidar.notRegister,
    },
    {
      title: t('SPAT'),
      icon: imgSpat,
      online: rateInfo.spat.online,
      offline: rateInfo.spat.offline,
      notRegister: rateInfo.spat.notRegister,
    },
  ];

  return (
    <div className={styles['d-container']}>
      <div className={styles['device-container']}>
        <div className={styles['device-title']}>{t('Device online rate')}</div>
        <div className={styles['device-content']}>
          {onlineMaps.map((map, index) => (
            <div key={index} className={styles['device-item']}>
              <div className={styles['device-item-center']}>
                <div>{map.title}</div>
                <div
                  className={classNames(
                    styles['device-image'],
                    map.isClick ? styles['device-image-click'] : null,
                  )}
                  onClick={() => map.isClick && handleClickItem(index)}
                >
                  <img className={styles['device-image-icon']} src={map.icon} alt="" />
                </div>
              </div>
              <div>
                {t('Online')}: {map.online}
              </div>
              <div>
                {t('Offline')}: {map.offline}
              </div>
              <div>
                {t('Not Registered')}: {map.notRegister}
              </div>
              <div>
                {t('Online rate')}: {(map.online / (map.online + map.offline)) * 100}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {showFooterIndex > -1 && showFooter()}
    </div>
  );
};

export default DeviceOnlineRate;
