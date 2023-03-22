import React from 'react';
import BaseContainer from '#/components/BaseContainer';
import { useNavigate } from 'react-router-dom';
import CollisionWarningList from '#/pages/EventManagement/components/CollisionWarningList';

const VRUCWList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <BaseContainer>
      <CollisionWarningList
        type="VRUCW"
        navigator={(row: Event.ICWListItem) => navigate(`/event/vrucw/details`, { state: row })}
      />
    </BaseContainer>
  );
};

export default VRUCWList;
