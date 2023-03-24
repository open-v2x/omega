import React from 'react';
import { Group, Line } from 'react-konva';
import WarningEllipse from './WarningEllipse';

const RetrogradeWarning: React.FC<{
  point: [number, number];
}> = ({ point }) => {
  const props = { stroke: '#d94948', strokeWidth: 2 };
  const retrogradeProps = { fill: 'rgba(217,73,72, 0.5)', ...props };

  console.log(point);

  return (
    <Group>
      <Line points={[...point]} dash={[10, 10]} {...props} />
      {/* <WarningImage x={x} y={y} /> */}
      <WarningEllipse x={point[0]} y={point[1]} {...retrogradeProps} />
    </Group>
  );
};

export default RetrogradeWarning;
