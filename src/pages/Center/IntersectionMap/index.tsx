import PlatformHeader from '#/components/PlatformHeader';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RoadMapXml from './components/RoadMapXml';
import RoadMap from './components/RoadMap';
import IntersectionStatistics from './components/IntersectionStatistics';
import BgContainer from '../components/BgContainer';
const IntersectionMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const intersectionCode = searchParams.get('code');
  const nodeId = searchParams.get('nodeId');

  return (
    <BgContainer>
      <PlatformHeader back />
      <div>
        {type === '1' && <RoadMap intersectionCode={intersectionCode} nodeId={nodeId as string} />}
        {type === '2' && <RoadMapXml id={id as string} />}
        <IntersectionStatistics intersectionCode={intersectionCode} />
      </div>
    </BgContainer>
  );
};

export default IntersectionMap;
