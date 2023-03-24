import PlatformHeader from '#/components/PlatformHeader';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoadMapXml from '../RoadMapXml';
import RoadMap from '../RoadMap';
import BgContainer from '#/pages/TrafficScreen/components/BgContainer';
import { useCenterStore } from '#/store/center';
import CloudPoint from '#/components/CloudPoint';
import DisplayModal from '#/components/DisplayModal';
import LiveStream from '#/components/LiveStream';
import DeviceOnlineRate from '#/pages/TrafficScreen/components/DeviceOnlineRate';
import IntersectionInformation from '#/pages/TrafficScreen/components/IntersectionInformation';
import classNames from 'classnames';
import styles from './index.module.less';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LiveStreamModule from '../../components/LiveStreamModule';
import CloudPointModule from '../../components/CloudPointModule';

const IntersectionMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [show, setShow] = useState(true);

  const cameraModalRef: any = useRef(null);
  const cloudPointModalRef: any = useRef(null);
  const centerStore = useCenterStore();

  const showLive = useCenterStore(state => state.isCameraFullscreen);
  const isCloudPointFullscreen = useCenterStore(state => state.isCloudPointFullscreen);

  useEffect(() => {
    if (showLive) {
      cameraModalRef.current?.handleShowModal();
    }
  }, [showLive]);

  useEffect(() => {
    if (isCloudPointFullscreen) {
      cloudPointModalRef.current?.handleShowModal();
    }
  }, [isCloudPointFullscreen]);

  return (
    <BgContainer>
      <PlatformHeader back />
      {
        <div>
          {type === '1' && <RoadMap />}
          {type === '2' && <RoadMapXml />}
          <>
            <div className={classNames(styles.right, show ? styles.show : styles.hide)}>
              <a className={styles['right-icon']} onClick={() => setShow(!show)}>
                {show ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </a>
              <div className={styles['right-content']}>
                <DeviceOnlineRate
                  className={show ? styles['device-show'] : styles['device-hide']}
                />
                <LiveStreamModule />
                <CloudPointModule />
              </div>
            </div>
            <IntersectionInformation />

            <DisplayModal
              ref={cameraModalRef}
              title={`${t('Show Camera')}`}
              width={800}
              component={<LiveStream url={centerStore.cameraUrl} />}
              footer={null}
              showFullscreen
              onCloseCallback={() => {
                centerStore.setState({
                  isCameraFullscreen: false,
                  cameraUrl: undefined,
                });
              }}
              onFullscreenCallback={() =>
                centerStore.setState({
                  isCameraFullscreen: false,
                })
              }
            />

            <DisplayModal
              ref={cloudPointModalRef}
              title={t('Point Cloud')}
              width={800}
              component={
                <CloudPoint
                  height={450}
                  width={780}
                  isFixedAspect
                  wsUrl={centerStore.cloudPointUrl}
                />
              }
              footer={null}
              showFullscreen
              onCloseCallback={() =>
                centerStore.setState({
                  isCloudPointFullscreen: false,
                  cloudPointUrl: undefined,
                })
              }
              onFullscreenCallback={() => {
                centerStore.setState({
                  isCloudPointFullscreen: false,
                });
              }}
            />
          </>
        </div>
      }
    </BgContainer>
  );
};

export default IntersectionMap;
