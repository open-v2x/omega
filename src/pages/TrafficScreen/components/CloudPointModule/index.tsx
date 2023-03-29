import CloudPoint from '#/components/CloudPoint';
import { useCenterStore } from '#/store/center';
import React from 'react';
import ModalContainer from '../ModalContainer';

const CloudPointModule: React.FC = () => {
  const isCloudPointFullscreen = useCenterStore(state => state.isCloudPointFullscreen);
  const cloudPointUrl = useCenterStore(state => state.cloudPointUrl);

  const handleFullscreenLidar = () => {
    useCenterStore.setState({
      isCloudPointFullscreen: true,
    });
  };

  const handleClose = () => {
    useCenterStore.setState({
      cloudPointUrl: undefined,
    });
  };

  return (
    <ModalContainer
      show={cloudPointUrl && !isCloudPointFullscreen}
      fullscreenCallback={handleFullscreenLidar}
      closeCallback={handleClose}
      component={
        <CloudPoint
          height={window.innerHeight / 4}
          width={window.innerWidth / 4 - 20}
          isFixedAspect
          wsUrl={cloudPointUrl}
        />
      }
    />
  );
};

export default CloudPointModule;
