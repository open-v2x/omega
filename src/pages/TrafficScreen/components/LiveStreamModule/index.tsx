import { useCenterStore } from '#/store/center';
import React from 'react';
import ModalContainer from '../ModalContainer';
import LiveStream from '#/components/LiveStream';

const LiveStreamModule: React.FC = () => {
  const isLiveStreamFullscreen = useCenterStore(state => state.isLiveStreamFullscreen);
  const liveStreamUrl = useCenterStore(state => state.liveStreamUrl);

  const handleFullscreenCamera = () => {
    useCenterStore.setState({
      isLiveStreamFullscreen: true,
    });
  };

  const handleCloseCamera = () => {
    useCenterStore.setState({
      liveStreamUrl: undefined,
    });
  };

  return (
    <ModalContainer
      show={liveStreamUrl && !isLiveStreamFullscreen}
      fullscreenCallback={handleFullscreenCamera}
      closeCallback={handleCloseCamera}
      component={<LiveStream url={liveStreamUrl} />}
    />
  );
};

export default LiveStreamModule;
