import BaseContainer from '#/components/BaseContainer';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CollisionWarningDetails from '../../components/CollisionWarningDetails';

const ICWDetails: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <CollisionWarningDetails type="ICW" data={state as Event.ICWListItem} />
    </BaseContainer>
  );
};

export default ICWDetails;
