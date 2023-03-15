import React from 'react';
import { Group } from 'react-konva';
import WarningEllipse from './WarningEllipse';
import WarningImage from './WarningImage';
import imgRed from '#/assets/images/event_triangle_red.png';

const OverSpeedWarning: React.FC<{ point: any }> = ({ point }) => {
  const props = { stroke: '#DC143C', strokeWidth: 2 };
  const ellipseProps = { fill: 'rgba(230, 230, 250, 0.5)', ...props };

  const x = point[0];
  const y = point[1];

  return (
    <Group key={`over_${x}_${y}`}>
      <WarningEllipse x={x} y={y} {...ellipseProps} />
      <WarningImage x={x} y={y} img={imgRed} />
    </Group>
  );
};

export default OverSpeedWarning;
