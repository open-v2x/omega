import CloudPoint from '#/components/CloudPoint';
import DisplayModal from '#/components/DisplayModal';
import LiveStream from '#/components/LiveStream';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import DeviceOnlineRate from '../DeviceOnlineRate';
import IntersectionInformation from '../IntersectionInformation';
import styles from './index.module.less';
import { useCenterStore } from '#/store/center';

const IntersectionStatistics: React.FC<{ intersectionCode: string }> = ({ intersectionCode }) => {
  const cameraModalRef: any = useRef(null);
  const cloudPointModalRef: any = useRef(null);
  const centerStore = useCenterStore();

  const showLive = useCenterStore(state => state.showCamera);
  const showCloudPoint = useCenterStore(state => state.showCloudPoint);

  useEffect(() => {
    if (showLive) {
      cameraModalRef.current?.handleShowModal();
    }
  }, [showLive]);

  useEffect(() => {
    if (showCloudPoint) {
      cloudPointModalRef.current?.handleShowModal();
    }
  }, [showCloudPoint]);

  const handleClearCamera = () => {
    centerStore.setState({
      cameraUrl: undefined,
      showCamera: false,
    });
  };

  const handleClearLidar = () => {
    centerStore.setState({
      cloudPointUrl: undefined,
      showCloudPoint: false,
    });
  };

  return (
    <div className={styles['common-content']}>
      <DeviceOnlineRate />
      <IntersectionInformation code={intersectionCode} />

      <DisplayModal
        ref={cameraModalRef}
        title={`${t('Show Camera')}`}
        width={800}
        component={<LiveStream url={centerStore.cameraUrl} />}
        footer={null}
        onCloseCallback={handleClearCamera}
      />

      <DisplayModal
        ref={cloudPointModalRef}
        title={t('Point Cloud')}
        width={800}
        component={
          <CloudPoint height={450} width={780} isFixedAspect wsUrl={centerStore.cloudPointUrl} />
        }
        footer={null}
        onCloseCallback={handleClearLidar}
      />
    </div>
  );
};

export default IntersectionStatistics;
