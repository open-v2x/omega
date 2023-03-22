import BaseContainer from '#/components/BaseContainer';
import CollisionWarningList from '#/pages/EventManagement/components/CollisionWarningList';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ICWList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <BaseContainer>
      <CollisionWarningList
        type="ICW"
        navigator={(row: Event.ICWListItem) => navigate(`/event/icw/details`, { state: row })}
      />
    </BaseContainer>
  );
};

export default ICWList;
