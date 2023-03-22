import BaseContainer from '#/components/BaseContainer';
import CollisionWarningDetails from '#/pages/EventManagement/components/CollisionWarningDetails';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
