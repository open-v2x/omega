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
    const index = params.streamUrl.indexOf('//');
    const streamUrl = window.__POWERED_BY_QIANKUN__
      ? `${window.location.origin}/omega/nginx/?url=${params.streamUrl.slice(index + 2)}`
      : params.wsUrl;
    centerStore.setShowCamera(streamUrl);
  };
  const handleClickLidar = params => {
    const index = params.streamUrl.indexOf('//');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = window.__POWERED_BY_QIANKUN__
      ? `${protocol}//${window.location.host}/nginx/?url=${params.wsUrl.slice(index)}`
      : params.wsUrl;
    centerStore.setShowCloudPoint(wsUrl);
  };

  const footerMap = {
    0: <ControlRsu />,
    1: (
      <ControlTable title={t('Camera Name')} dataName={'cameras'} onCallback={handleClickCamera} />
    ),
    3: <ControlTable title={t('Lidar Name')} dataName={'lidars'} onCallback={handleClickLidar} />,
  };

  const showFooter = () => footerMap[showFooterIndex];

  const onlineMaps = [
    {
      title: t('RSU online rate'),
      icon: imgRsu,
      tag: 'rsu',
      isClick: true,
    },
    {
      title: t('Side Camera'),
      icon: imgCamera,
      tag: 'camera',
      isClick: true,
    },
    {
      title: t('Radar'),
      icon: imgRadar,
      tag: 'radar',
    },
    {
      title: t('Lidar'),
      icon: imgRadar,
      tag: 'lidar',
      isClick: true,
    },
    {
      title: t('SPAT'),
      icon: imgSpat,
      tag: 'spat',
    },
  ];

  return (
    <div className={styles['d-container']}>
      <div className={styles['device-container']}>
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
      {showFooterIndex > -1 && showFooter()}
    </div>
  );
};

export default DeviceOnlineRate;
