import BaseContainer from '#/components/BaseContainer';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicInfo from '../components/BasicInfo';
import SendList from '../components/SendList';
import styles from './index.module.less';

const MapDetail: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const mapId = +params.id;

  if (!mapId) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <BasicInfo mapId={mapId} />
      <div className={styles['send-list']}>
        <SendList mapId={mapId} />
      </div>
    </BaseContainer>
  );
};

export default MapDetail;
