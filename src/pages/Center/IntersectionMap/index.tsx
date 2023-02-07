import PlatformHeader from '#/components/PlatformHeader';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoadMapXml from './components/RoadMapXml';
import RoadMap from './components/RoadMap';
import IntersectionStatistics from './components/IntersectionStatistics';
import BgContainer from '../components/BgContainer';
import { useCenterStore } from '#/store/center';
const IntersectionMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const intersectionCode = searchParams.get('code');
  const nodeId = searchParams.get('nodeId');
  const centerStore = useCenterStore();

  useEffect(() => {
    centerStore.setIntersectionCode(intersectionCode);
  }, [intersectionCode]);

  return (
    <BgContainer>
      <PlatformHeader back />
      {centerStore.intersectionCode && (
        <div>
          {type === '1' && (
            <RoadMap intersectionCode={intersectionCode} nodeId={nodeId as string} />
          )}
          {type === '2' && <RoadMapXml id={id as string} />}
          <IntersectionStatistics intersectionCode={intersectionCode} />
        </div>
      )}
    </BgContainer>
  );
};

export default IntersectionMap;
