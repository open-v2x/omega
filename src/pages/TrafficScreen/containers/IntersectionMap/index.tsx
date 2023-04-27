import PlatformHeader from '#/components/PlatformHeader';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { MenuUnfoldOutlined, MenuFoldOutlined, CloseCircleFilled } from '@ant-design/icons';
import LiveStreamModule from '#/pages/TrafficScreen/components/LiveStreamModule';
import CloudPointModule from '#/pages/TrafficScreen/components/CloudPointModule';
import { useRootStore } from '#/store/root';
import { Button, Modal } from 'antd';

const IntersectionMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { getNodeId } = useRootStore();
  const navigate = useNavigate();

  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(true);

  const cameraModalRef: any = useRef(null);
  const cloudPointModalRef: any = useRef(null);
  const centerStore = useCenterStore();

  const isLiveStreamFullscreen = useCenterStore(state => state.isLiveStreamFullscreen);
  const isCloudPointFullscreen = useCenterStore(state => state.isCloudPointFullscreen);

  useEffect(() => {
    if (isLiveStreamFullscreen) {
      cameraModalRef.current?.handleShowModal();
    }
  }, [isLiveStreamFullscreen]);

  useEffect(() => {
    if (isCloudPointFullscreen) {
      cloudPointModalRef.current?.handleShowModal();
    }
  }, [isCloudPointFullscreen]);

  return (
    <>
      <BgContainer>
        <PlatformHeader back />
        {
          <div>
            {type === '1' && <RoadMap />}
            {type === '2' && <RoadMapXml />}
            <div className={classNames(styles.left, showLeft ? styles.show : styles.hide)}>
              <a className={styles['left-icon']} onClick={() => setShowLeft(!showLeft)}>
                {showLeft ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </a>
              <div className={styles['left-content']}>
                <IntersectionInformation
                  className={showLeft ? styles['left-show'] : styles['left-hide']}
                />
              </div>
            </div>
            <div className={classNames(styles.right, showRight ? styles.show : styles.hide)}>
              <a className={styles['right-icon']} onClick={() => setShowRight(!showRight)}>
                {showRight ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </a>
              <div className={styles['right-content']}>
                <DeviceOnlineRate
                  className={showRight ? styles['right-show'] : styles['right-hide']}
                />
                <LiveStreamModule />
                <CloudPointModule />
              </div>
            </div>

            <DisplayModal
              ref={cameraModalRef}
              title={`${t('Show Camera')}`}
              width={800}
              component={<LiveStream url={centerStore.liveStreamUrl} />}
              footer={null}
              showFullscreen
              onCloseCallback={() => {
                centerStore.setState({
                  isLiveStreamFullscreen: false,
                  liveStreamUrl: undefined,
                });
              }}
              onFullscreenCallback={() =>
                centerStore.setState({
                  isLiveStreamFullscreen: false,
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
          </div>
        }
      </BgContainer>
      <Modal
        open={!getNodeId()}
        closable={false}
        footer={
          <Button onClick={() => navigate('/system/edgeSiteConfig?hs=1')}>{t('Got it')}</Button>
        }
      >
        <div className={styles['modal-container']}>
          <div className={styles['modal-title']}>
            <span className={styles['modal-icon']}>
              <CloseCircleFilled />
            </span>
            <span>{t('Something is Error')}</span>
          </div>
          <div className={styles['modal-content']}>
            <div>{t('No Node Id')}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IntersectionMap;
