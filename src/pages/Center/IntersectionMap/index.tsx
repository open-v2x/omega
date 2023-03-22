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

  return (
    <BgContainer>
      <PlatformHeader back />
      {
        <div>
          {type === '1' && <RoadMap />}
          {type === '2' && <RoadMapXml />}
          <IntersectionStatistics />
        </div>
      }
    </BgContainer>
  );
};

export default IntersectionMap;
