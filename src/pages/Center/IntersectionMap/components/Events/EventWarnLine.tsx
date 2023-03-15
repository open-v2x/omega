import React from 'react';
import WarningImage from '../Events/WarningImage';
import WarningEllipse from './WarningEllipse';
import { Group, Line } from 'react-konva';
import imgEventWarn from '#/assets/images/event_warn.png';

const EventWarnLine: React.FC<{ firstPoint: [number, number]; secondPoint: [number, number] }> = ({
  firstPoint,
  secondPoint,
}) => {
  const props = { stroke: '#FFC12B', strokeWidth: 2 };
  const ellipseProps = { fill: 'rgba(255, 158, 23, 0.5)', ...props };
  return (
    <Group>
      <Line points={[...firstPoint, ...secondPoint]} dash={[10, 10]} {...props} />
      {[firstPoint, secondPoint].map(([x, y], index) => (
        <Group key={`${x}${y}${index}`}>
          <WarningEllipse x={x} y={y} {...ellipseProps} />
          <WarningImage x={x} y={y} img={imgEventWarn} />
        </Group>
      ))}
    </Group>
  );
};

export default EventWarnLine;
