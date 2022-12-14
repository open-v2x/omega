import CloudPoint from '#/components/CloudPoint';
import DisplayModal from '#/components/DisplayModal';
import LiveStream from '#/components/LiveStream';
import { Button } from 'antd';
import React from 'react';
import { useCallback, useRef, useState } from 'react';
import DeviceOnlineRate from './DeviceOnlineRate';
import IntersectionInformation from './IntersectionInformation';

const IntersectionStatistics: React.FC<{ intersectionCode: string }> = ({ intersectionCode }) => {
  const cameraModalRef: any = useRef(null);
  const cloudPointModalRef: any = useRef(null);
  const deviceOnlineRateRef: any = useRef(null);

  const [playLiveStream, setPlayLiveStream] = useState<{ url: string; title: string }>({
    url: '',
    title: '',
  });
  const [wsUrl, setWsUrl] = useState('');

  /**
   * @description: 切换摄像头
   * @param {boolean} isNext true: 下一个， false: 上一个
   * @return {*}
   */
  const handleChangeCamera = useCallback(async (isNext: boolean) => {
    const getStream = await deviceOnlineRateRef.current?.changeCamera(isNext);
    setPlayLiveStream(getStream);
  }, []);

  const footer = (
    <div>
      <Button onClick={() => handleChangeCamera(false)}>上一个</Button>
      <Button onClick={() => handleChangeCamera(true)}>下一个</Button>
    </div>
  );

  const liveStreamFooter = () => {
    const length = deviceOnlineRateRef.current?.cameras?.length;
    return length > 1 ? footer : null;
  };

  const lidarStreamFooter = () => {
    const length = deviceOnlineRateRef.current?.lidars?.length;
    return length > 1 ? footer : null;
  };

  const showLiveStreamCallback = (url: string, title: string) => {
    setPlayLiveStream({ url, title });
    cameraModalRef.current?.handleShowModal();
  };

  const showLiveCloudPointCallback = (url: string) => {
    setWsUrl(url);
    cloudPointModalRef.current?.handleShowModal();
  };

  return (
    <>
      <DeviceOnlineRate
        intersectionCode={intersectionCode}
        showLiveStream={showLiveStreamCallback}
        showCloudPoint={showLiveCloudPointCallback}
        ref={deviceOnlineRateRef}
      />
      <IntersectionInformation code={intersectionCode} />

      <DisplayModal
        ref={cameraModalRef}
        title={`${t('Show Camera')} —— ${playLiveStream.title}`}
        width={800}
        component={<LiveStream url={playLiveStream.url} />}
        footer={liveStreamFooter()}
        onCloseCallback={null}
      />

      <DisplayModal
        ref={cloudPointModalRef}
        title={t('Point Cloud')}
        width={800}
        component={<CloudPoint height={450} width={780} isFixedAspect wsUrl={wsUrl} />}
        footer={lidarStreamFooter()}
        onCloseCallback={null}
      />
    </>
  );
};

export default IntersectionStatistics;
