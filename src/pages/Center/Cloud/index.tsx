import CountryCascader from '#/components/CountryCascader';
import PlatformHeader from '#/components/PlatformHeader';
import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  Marker,
  useMapContext,
} from '@uiw/react-amap';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import imgLocation from '#/assets/images/location.png';
import styles from './index.module.less';

type MarkerType = {
  type: number;
  rsuId: number;
  rsuEsn: string;
  lngLat: [number, number] | [];
};

const CloudPlatform: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [markerList, setMarkerList] = useState<MarkerType>();
  const { AMap: AM } = useMapContext();

  const mapLngLat = (data?: MarkerType) => {
    setMarkerList(data);
  };

  const ChildrenMap = ({ AMap }) => (
    <>
      <ScaleControl offset={[20, 30]} position="LB" />
      <ToolBarControl offset={[30, 30]} position="RB" />
      {markerList?.lngLat.length ? (
        <Marker
          icon={
            new AMap.Icon({
              imageSize: new AMap.Size(36, 36),
              image: imgLocation,
            })
          }
          offset={new AMap.Pixel(-18, -36)}
          position={new AMap.LngLat(...markerList.lngLat)}
          onClick={() =>
            navigate(
              `/center/map?type=${markerList.type}&id=${markerList.rsuId}&esn=${markerList.rsuEsn}&nodeId=${id}`,
            )
          }
        />
      ) : (
        ''
      )}
    </>
  );

  return (
    <div className="cloud-platform">
      <PlatformHeader back position="relative">
        <CountryCascader
          nodeId={+id}
          defaultValue={['CN', '320000', '320100', '320115']}
          mapChange={mapLngLat}
        />
      </PlatformHeader>
      <div className={styles['map-container']}>
        <APILoader akay={process.env.AMAP_KEY}>
          <Map
            center={markerList?.lngLat.length ? markerList.lngLat : undefined}
            mapStyle="amap://styles/blue"
            zoom={16}
            children={<ChildrenMap AMap={AM} />}
          />
        </APILoader>
      </div>
    </div>
  );
};

export default CloudPlatform;
