import { Group, Line } from 'react-konva';
import WarningEllipse from './WarningEllipse';
import React from 'react';

type Point = { x: number; y: number };

const ChangeLanes: React.FC<{ egoPoint: Point; trajPoints: Point[] }> = ({
  egoPoint,
  trajPoints = [],
}) => {
  const points = trajPoints.reduce((data: number[], { x, y }) => [...data, x, y], []);
  const stroke = { darkGreen: '#00FF00' };
  const fill = { darkGreen: 'rgba(0, 128, 0, 0.6)' };
  return (
    <Group>
      <WarningEllipse
        x={egoPoint.x}
        y={egoPoint.y}
        stroke={stroke.darkGreen}
        fill={fill.darkGreen}
      />
      <Line points={points} dash={[10, 10]} stroke={stroke.darkGreen} strokeWidth={2} />
    </Group>
  );
};

export default ChangeLanes;
