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
import { Card, Dropdown } from 'antd';
import BgContainer from '../components/BgContainer';
import classNames from 'classnames';

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
    <BgContainer>
      <PlatformHeader back position="relative">
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <Card className={styles['map-address']}>
              <CountryCascader
                nodeId={+id}
                defaultValue={['CN', '320000', '320100', '320115']}
                mapChange={mapLngLat}
              />
            </Card>
          )}
        >
          <div className={classNames(styles['left-button'], 'f-middle')}>选择</div>
        </Dropdown>
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
    </BgContainer>
  );
};

export default CloudPlatform;
