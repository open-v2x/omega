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
import { useNavigate } from 'react-router-dom';
import imgLocation from '#/assets/images/location.png';
import styles from './index.module.less';
import { Card, Dropdown } from 'antd';
import BgContainer from '../../components/BgContainer';
import classNames from 'classnames';
import { useRootStore } from '#/store/root';

type MarkerType = {
  type: number;
  id: number;
  code: string;
  lngLat: [number, number] | [];
};

const CloudPlatform: React.FC = () => {
  const navigate = useNavigate();

  const [markerList, setMarkerList] = useState<MarkerType>();
  const { AMap: AM } = useMapContext();

  const edgeId = useRootStore().getNodeId();

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
          onClick={() => {
            navigate(`/traffic/map?type=${markerList.type}&nodeId=${edgeId}`);
          }}
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
          overlayClassName={styles['dropdown-overlay']}
          dropdownRender={() => (
            <Card className={styles['map-address']} bordered={false}>
              <CountryCascader
                mapChange={mapLngLat}
                colon={false}
                labelClass={styles['map-address-label']}
              />
            </Card>
          )}
        >
          <div className={classNames(styles['left-button'], 'f-middle')}>{t('Select')}</div>
        </Dropdown>
      </PlatformHeader>
      <div className={styles['map-container']}>
        <APILoader akay={process.env.AMAP_KEY}>
          <Map
            center={markerList?.lngLat.length ? markerList.lngLat : undefined}
            mapStyle="amap://styles/macaron"
            zoom={16}
            children={<ChildrenMap AMap={AM} />}
          />
        </APILoader>
      </div>
    </BgContainer>
  );
};

export default CloudPlatform;
