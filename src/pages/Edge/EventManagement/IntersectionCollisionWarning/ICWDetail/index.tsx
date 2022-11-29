import BaseContainer from '#/components/BaseContainer';
import { RouterMatchTypes } from '#/typings/pro-component';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollisionWarningDetails from '../../components/CollisionWarningDetails';

const ICWDetails: React.FC<RouterMatchTypes> = ({ location: { state } }) => {
  const navigate = useNavigate();
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
