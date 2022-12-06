import BaseContainer from '#/components/BaseContainer';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import BasicInfo from './components/BasicInfo';

const RSMDetails: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) {
    navigate(-1);
  }

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={state as Event.RSMListItem} />
    </BaseContainer>
  );
};

export default RSMDetails;
