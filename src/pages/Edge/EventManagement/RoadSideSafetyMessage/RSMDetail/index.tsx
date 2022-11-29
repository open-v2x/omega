import BaseContainer from '#/components/BaseContainer';
import { RouterMatchTypes } from '#/typings/pro-component';
import React from 'react';
import { useNavigate } from 'react-router';
import BasicInfo from './components/BasicInfo';

const RSMDetails: React.FC<RouterMatchTypes> = ({ location: { state } }) => {
  const navigate = useNavigate();
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
