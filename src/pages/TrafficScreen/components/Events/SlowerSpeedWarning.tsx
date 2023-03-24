import React from 'react';
import { Group } from 'react-konva';
import WarningEllipse from './WarningEllipse';
import WarningImage from './WarningImage';
import imgOrange from '#/assets/images/event_triangle_orange.png';

const SlowerSpeedWarning: React.FC<{ point: any }> = ({ point }) => {
  const props = { stroke: '#ADD8E6', strokeWidth: 2 };
  const ellipseProps = { fill: 'rgba(230, 230, 250, 0.5)', ...props };

  const x = point[0];
  const y = point[1];

  return (
    <Group key={`slower_${x}_${y}`}>
      <WarningEllipse x={x} y={y} {...ellipseProps} />
      <WarningImage x={x} y={y} img={imgOrange} />
    </Group>
  );
};

export default SlowerSpeedWarning;
