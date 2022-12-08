import BaseContainer from '#/components/BaseContainer';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CollisionWarningDetails from '../../components/CollisionWarningDetails';

const VRUCWDetails: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <CollisionWarningDetails type="VRUCW" data={state as Event.ICWListItem} />
    </BaseContainer>
  );
};

export default VRUCWDetails;
