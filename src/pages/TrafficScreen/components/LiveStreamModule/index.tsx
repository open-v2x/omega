import { useCenterStore } from '#/store/center';
import React from 'react';
import ModalContainer from '../ModalContainer';
import LiveStream from '#/components/LiveStream';

const LiveStreamModule: React.FC = () => {
  const isCameraFullScreen = useCenterStore(state => state.isCameraFullscreen);
  const cameraUrl = useCenterStore(state => state.cameraUrl);

  const handleFullscreenCamera = () => {
    useCenterStore.setState({
      isCameraFullscreen: true,
    });
  };

  const handleCloseCamera = () => {
    useCenterStore.setState({
      cameraUrl: undefined,
    });
  };

  return (
    <ModalContainer
      show={cameraUrl && !isCameraFullScreen}
      fullscreenCallback={handleFullscreenCamera}
      closeCallback={handleCloseCamera}
      component={<LiveStream url={cameraUrl} />}
    />
  );
};

export default LiveStreamModule;
