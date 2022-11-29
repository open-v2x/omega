import React from 'react';
import BasicInfo from './BasicInfo';
import CarInfo from './CarInfo';
import OtherCarInfo from './OtherCarInfo';

type CollisionWarningDetailsProps = {
  type: 'ICW' | 'VRUCW';
  data: Event.ICWListItem;
};

const CollisionWarningDetails: React.FC<CollisionWarningDetailsProps> = ({ type, data }) => (
  <>
    <BasicInfo basicInfo={data} />
    <CarInfo info={data} />
    <OtherCarInfo type={type} info={data} />
  </>
);

export default CollisionWarningDetails;
