import PlatformHeader from '#/components/PlatformHeader';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import RoadMapXml from './components/RoadMapXml';
import RoadMap from './components/RoadMap';
import IntersectionStatistics from './components/IntersectionStatistics';

const IntersectionMap: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const esn = searchParams.get('esn');
  const nodeId = searchParams.get('nodeId');

  return (
    <div className="cloud-platform">
      <PlatformHeader back />
      <div>
        {type === '1' && <RoadMap esn={esn as string} nodeId={nodeId as string} />}
        {type === '2' && <RoadMapXml id={id as string} />}
        <IntersectionStatistics esn={esn as string} />
      </div>
    </div>
  );
};

export default IntersectionMap;
