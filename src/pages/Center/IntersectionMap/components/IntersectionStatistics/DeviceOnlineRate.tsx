/* eslint-disable jsx-a11y/anchor-is-valid */
import { onlineRate } from '#/services/api/center/site';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './index.module.less';

import imgRsu from '#/assets/images/platform_rsu.png';
import imgCamera from '#/assets/images/platform_camera.png';
import imgRadar from '#/assets/images/platform_radar.png';
import imgSpat from '#/assets/images/platform_spat.png';
import OnlineRatePie from './OnlineRatePie';
import { deviceList } from '#/services/api/device/device';
import { cameraList } from '#/services/api/device/camera';
import { lidarList } from '#/services/api/device/lidar';
import { Select } from 'antd';

// 设备在线率
const DeviceOnlineRate = forwardRef(
  (
    {
      intersectionCode,
      showLiveStream,
      showCloudPoint,
    }: {
      intersectionCode: string;
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

    const [rsus, setRsus] = useState<any[]>([]);
    const [curRsu, setCurRsu] = useState();

    // 摄像头
    const [cameras, setCameras] = useState<Center.OnlineCameras[]>([]);
    const [cameraIndex, setCameraIndex] = useState(0);
    const cameraIndexRef = useRef(0);
    // 雷达
    const [lidars, setLidars] = useState<any>([]);
    const [lidarIndex, setLidarIndex] = useState(0);
    const lidarIndexRef = useRef(0);

    const fetchRsus = async () => {
      const { data } = await deviceList({
        pageNum: 1,
        pageSize: -1,
        intersectionCode: intersectionCode,
      });
      setRsus(data);
    };

    const fetchOnlineRate = async (rsuId?: number) => {
      const { data } = await onlineRate({
        edgeRsuId: rsuId,
      });
      setRateInfo(data);
    };

    const fetchCameras = async (rsuId?: number) => {
      const { data } = await cameraList({ intersectionCode, rsuId });
      const result = data.map(d => ({
        id: d.id,
        sn: d.sn,
        name: d.name,
        streamUrl: d.streamUrl,
      }));
      setCameras(result);
    };

    const fetchLidars = async (rsuId?: number) => {
      const { data } = await lidarList({ intersectionCode, rsuId });
      setLidars(data);
    };

    useEffect(() => {
      fetchRsus();
      fetchCameras();
      fetchLidars();
      fetchOnlineRate();
      const id = setInterval(() => {
        fetchRsus();
      }, 5000);
      return () => clearInterval(id);
    }, []);

    useEffect(() => {
      if (curRsu) {
        const { id } = curRsu;
        fetchCameras(id);
        fetchLidars(id);
        fetchOnlineRate(id);
      } else {
        fetchCameras();
        fetchLidars();
        fetchOnlineRate();
      }
    }, [curRsu]);

    const handleChangeRSU = (value?: number | string) => {
      if (value) {
        const findOne = rsus.find(rsu => rsu.rsuId === value);
        setCurRsu(findOne);
      } else {
        setCurRsu(undefined);
      }
    };

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

    const footerRsu = () => (
      <div className={styles['font-change-name']}>
        <div className={styles.footer}>
          <span>RSU：</span>
          <Select
            style={{ width: 160 }}
            allowClear
            onChange={handleChangeRSU}
            onClear={handleChangeRSU}
          >
            {rsus.map(rsu => (
              <Select.Option key={rsu.rsuId} value={rsu.rsuId}>
                {rsu.rsuName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    );

    const footerCamera = () => (
      <div className={styles['font-change-name']}>
        <div className={styles.footer}>
          <span>{t('Camera')}：</span>
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

    const DivOnlineRate: React.FC<Center.OnlineType> = ({ online, offline }) => (
      <div className={styles['online-statistics-value']}>
        {online && Math.floor((online / (online + offline)) * 100)}%
      </div>
    );

    return (
      <div>
        <div className={classNames(styles.online, show ? styles.show : styles.hide)}>
          <a className={styles['left-icon']} onClick={() => setShow(!show)}>
            {show ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </a>
          <div className={styles['rate-title']}>{t('Device online rate')}</div>
          <div className={classNames(styles['rate-content'], styles.wrapper)}>
            <div className={classNames(styles.wrapper, 'f-column')}>
              <div className="f f-a-center">
                <img className={styles['online-image']} src={imgRsu} alt="" />
                <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                  {t('RSU online rate')}:
                  <DivOnlineRate {...rateInfo.rsu} />
                </div>
              </div>
              <div className={styles['chart-wrapper']}>
                <OnlineRatePie value={rateInfo.rsu} />
              </div>
              {footerRsu()}
            </div>
            <div className={classNames(styles.wrapper, 'f-column')}>
              <div className="f f-a-center">
                <img className={styles['online-image']} src={imgCamera} alt="" />
                <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                  {t('Side Camera')}:
                  <DivOnlineRate {...rateInfo.camera} />
                </div>
              </div>
              <div className={styles['chart-wrapper']}>
                <OnlineRatePie value={rateInfo.camera} />
              </div>
              {footerCamera()}
            </div>
            <div className={classNames(styles.wrapper, 'f-column')}>
              <div className="f f-a-center">
                <img className={styles['online-image']} src={imgRadar} alt="" />
                <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                  {t('Radar')}:
                  <DivOnlineRate {...rateInfo.radar} />
                </div>
              </div>
              <div className={styles['chart-wrapper']}>
                <OnlineRatePie value={rateInfo.radar} />
              </div>
            </div>
            <div className={classNames(styles.wrapper, 'f-column')}>
              <div className="f f-a-center">
                <img className={styles['online-image']} src={imgRadar} alt="" />
                <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                  {t('Lidar')}:
                  <DivOnlineRate {...rateInfo.lidar} />
                </div>
              </div>
              <div className={styles['chart-wrapper']}>
                <OnlineRatePie value={rateInfo.lidar} />
              </div>
              {footerLidar()}
            </div>
            <div className={classNames(styles.wrapper, 'f-column')}>
              <div className="f f-a-center">
                <img className={styles['online-image']} src={imgSpat} alt="" />
                <div className={classNames(styles['online-statistics'], 'f f-a-center')}>
                  {t('SPAT')}:
                  <DivOnlineRate {...rateInfo.spat} />
                </div>
              </div>
              <div className={styles['chart-wrapper']}>
                <OnlineRatePie value={rateInfo.spat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default DeviceOnlineRate;
