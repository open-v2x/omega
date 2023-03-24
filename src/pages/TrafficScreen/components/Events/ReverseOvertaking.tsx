import React from 'react';
import WarningEllipse from './WarningEllipse';

type Point = { x: number; y: number };

const ReverseOvertaking: React.FC<{ egoPoint: Point; accept: boolean }> = ({
  egoPoint,
  accept,
}) => {
  const stroke = {
    green: '#47FF95',
    red: '#FF7777',
  };
  const fill = {
    green: 'rgba(71, 255, 149, 0.3)',
    red: 'rgba(255, 119, 119, 0.3)',
  };
  return (
    <WarningEllipse
      x={egoPoint.x}
      y={egoPoint.y}
      stroke={accept ? stroke.green : stroke.red}
      fill={accept ? fill.green : fill.red}
    />
  );
};

export default ReverseOvertaking;
