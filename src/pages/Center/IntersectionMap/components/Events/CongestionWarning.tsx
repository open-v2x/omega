import { Group, Line } from 'react-konva';
import React from 'react';

const CongestionWarning: React.FC<{
  level: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
}> = ({ level, start, end }) => {
  const levelRgb = {
    0: 'transparent',
    1: 'rgba(255,165,0, 0.5)',
    2: 'rgba(240, 86, 84, 0.9)',
    3: 'rgba(220, 48, 35, 0.9)',
  };

  console.log(`事件拥堵等级：${level}`);

  return (
    <Group>
      <Line points={[start.x, start.y, end.x, end.y]} stroke={levelRgb[level]} strokeWidth={16} />
    </Group>
  );
};

export default CongestionWarning;
