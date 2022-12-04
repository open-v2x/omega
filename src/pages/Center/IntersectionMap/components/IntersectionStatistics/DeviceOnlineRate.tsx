/* eslint-disable jsx-a11y/anchor-is-valid */
import { getCamerasByRsuEsn, getLidarsByRsuEsn, onlineRate } from '#/services/api/center/site';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.less';

import imgRsu from '#/assets/images/platform_rsu.png';
import imgCamera from '#/assets/images/platform_camera.png';
import imgRadar from '#/assets/images/platform_radar.png';
import imgSpat from '#/assets/images/platform_spat.png';
import OnlineRatePie from './OnlineRatePie';

// 设备在线率
const DeviceOnlineRate = forwardRef(
  (
    {
      esn,
      showLiveStream,
      showCloudPoint,
    }: {
      esn: string;
      showLiveStream: (url: string, title: string) => void;
      showCloudPoint: (wsUrl: string) => void;
    },
    ref,
  ) => {
    const [show, setShow] = useState(true);
    const [rateInfo, setRateInfo] = useState<Center.OnlineRateItem>({
      rsu: { online: 0, offline: 0, notRegister: 0 },
      camera: { online: 0, offline: 0, notRegister: 0 },
      radar: { online: 0, offline: 0, notRegister: 0 },
      lidar: { online: 0, offline: 0, notRegister: 0 },
      spat: { online: 0, offline: 0, notRegister: 0 },
    });

    // 摄像头
    const [cameras, setCameras] = useState<Center.OnlineCameras[]>([]);
    const [cameraIndex, setCameraIndex] = useState(0);
    const cameraIndexRef = useRef(0);
    // 雷达
    const [lidars, setLidars] = useState<any>([]);
    const [lidarIndex, setLidarIndex] = useState(0);
    const lidarIndexRef = useRef(0);

    const fetchOnlineRate = async () => {
      const { data } = await onlineRate();
      setRateInfo(data);
    };

    const fetchCameras = useCallback(async () => {
      const { data } = await getCamerasByRsuEsn(esn);
      setCameras(data);
    }, [esn]);

    const fetchLidars = useCallback(async () => {
      const { data } = await getLidarsByRsuEsn(esn);
      setLidars(data);
    }, [esn]);

    useEffect(() => {
      fetchOnlineRate();
      fetchCameras();
      fetchLidars();
      const id = setInterval(() => {
        fetchOnlineRate();
        fetchCameras();
        fetchLidars();
      }, 5000);
      return () => clearInterval(id);
    }, [fetchCameras, fetchLidars]);

    const handleToLiveStream = () => {
      if (cameras.length) {
        const { streamUrl, name } = cameras[cameraIndex];
        showLiveStream?.(streamUrl, name);
      }
    };

    const handleToCloudPoint = () => {
      if (lidars.length) {
        const { wsUrl } = lidars[lidarIndex];
        showCloudPoint?.(wsUrl);
      }
    };

    const handleChangeCamera = (isAdd: boolean) => {
      if (isAdd) {
        if (cameraIndex === cameras.length - 1) {
          cameraIndexRef.current = 0;
        } else {
          cameraIndexRef.current = cameraIndex + 1;
        }
      } else {
        if (cameraIndex === 0) {
          cameraIndexRef.current = cameras.length - 1;
        } else {
          cameraIndexRef.current = cameraIndex - 1;
        }
      }
      setCameraIndex(cameraIndexRef.current);
    };

    const handleChangeLidar = (isAdd: boolean) => {
      if (isAdd) {
        if (lidarIndex === lidars.length - 1) {
          lidarIndexRef.current = 0;
        } else {
          lidarIndexRef.current = lidarIndex + 1;
        }
      } else {
        if (lidarIndex === 0) {
          lidarIndexRef.current = lidars.length - 1;
        } else {
          lidarIndexRef.current = lidarIndex - 1;
        }
      }
      setLidarIndex(lidarIndexRef.current);
    };

    const getNextCamera = () => handleChangeCamera(true);
    const getPreCamera = () => handleChangeCamera(false);
    const getNextLidar = () => handleChangeLidar(true);
    const getPreLidar = () => handleChangeLidar(false);

    useImperativeHandle(ref, () => ({
      changeCamera: (isAdd: boolean) => {
        if (isAdd) {
          getNextCamera();
        } else {
          getPreCamera();
        }
        const { streamUrl, name } = cameras[cameraIndexRef.current];
        return { url: streamUrl, title: name };
      },
      cameras: cameras,
      lidars: lidars,
    }));

    const footerCamera = () => (
      <div className={styles['font-change-name']}>
        <div className={styles.footer}>
          <span>摄像头：</span>
          <span
            className={classNames(styles['cursor-pointer'], styles['mr-10'])}
            onClick={() => handleToLiveStream()}
          >
            {cameras[cameraIndex]?.name || '---'}
          </span>
        </div>
        {cameras.length > 1 && (
          <div className={styles['font-change-name-icon']}>
            <CaretUpOutlined onClick={getPreCamera} />
            <CaretDownOutlined onClick={getNextCamera} />
          </div>
        )}
      </div>
    );

    const footerLidar = () => (
      <div className={styles['font-change-name']}>
        <div className={styles.footer}>
          <span>查看雷达云点：</span>
          <span
            className={classNames(styles['cursor-pointer'], styles['mr-10'])}
            onClick={() => handleToCloudPoint()}
          >
            {lidars[lidarIndex]?.name || '---'}
          </span>
        </div>
        {lidars.length > 1 && (
          <div className={styles['font-change-name-icon']}>
            <CaretUpOutlined onClick={getPreLidar} />
            <CaretDownOutlined onClick={getNextLidar} />
          </div>
        )}
      </div>
    );

    const rateMap = [
      { icon: imgRsu, name: t('RSU online rate'), value: rateInfo.rsu },
      {
        icon: imgCamera,
        name: t('Camera'),
        value: rateInfo.camera,
        footer: footerCamera,
      },
      { icon: imgRadar, name: t('Radar'), value: rateInfo.radar },
      { icon: imgRadar, name: t('Lidar'), value: rateInfo.lidar, footer: footerLidar },
      { icon: imgSpat, name: t('SPAT'), value: rateInfo.spat },
    ];

    return (
      <div>
        <div className={classNames(styles.online, show ? styles.show : styles.hide)}>
          <a className={styles['left-icon']} onClick={() => setShow(!show)}>
            {show ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </a>
          <div className={styles['rate-title']}>{t('Device online rate')}</div>
          <div className={classNames(styles['rate-content'], styles.wrapper)}>
            {rateMap.map(
              ({ icon, name, value: { online = 0, offline = 0, notRegister = 0 }, footer }) => (
                <div key={name as string} className={classNames(styles.wrapper, 'f-column')}>
                  <div className="f f-a-center">
                    <img className={styles['online-image']} src={icon} alt="" />
                    <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                      {name}:
                      <div className={styles['online-statistics-value']}>
                        {online && Math.floor((online / (online + offline)) * 100)}%
                      </div>
                    </div>
                  </div>
                  <div className={styles['chart-wrapper']}>
                    <OnlineRatePie value={{ online, offline, notRegister }} />
                  </div>
                  {footer && footer()}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default DeviceOnlineRate;
