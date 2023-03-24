import { Group } from 'react-konva';
import WarningEllipse from './WarningEllipse';
import React from 'react';
type Point = { x: number; y: number };

const DataSharing: React.FC<{ egoPoint: Point; points: Point[] }> = ({ egoPoint, points = [] }) => {
  const stroke = {
    purple: '#E178FF',
    blue: '#36DCFF',
  };
  const fill = {
    purple: 'rgba(225, 120, 255, 0.3)',
    blue: 'rgba(54, 220, 255, 0.3)',
  };
  return (
    <Group>
      <WarningEllipse x={egoPoint.x} y={egoPoint.y} stroke={stroke.purple} fill={fill.purple} />
      {points.map(({ x, y }: Point, index: number) => (
        <WarningEllipse
          key={`${x}${y}${index}`}
          x={x}
          y={y}
          stroke={stroke.blue}
          fill={fill.blue}
        />
      ))}
    </Group>
  );
};

export default DataSharing;
