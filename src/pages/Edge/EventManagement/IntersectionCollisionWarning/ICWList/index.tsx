import BaseContainer from '#/components/BaseContainer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollisionWarningList from '../../components/CollisionWarningList';

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
