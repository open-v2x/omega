import imgMotor from '#/assets/images/motor.png';
import imgNonMotor from '#/assets/images/non_motor.png';
import imgPedestrian from '#/assets/images/pedestrian.png';
import React from 'react';
import { Group, Image as KonvaImage } from 'react-konva';

const Track: React.FC<{
  x: number;
  y: number;
  type: 'motor' | 'non-motor' | 'pedestrian';
  rotation: number;
  size: {
    width: number;
    height: number;
  };
}> = ({ type, x, y, rotation, size }) => {
  const imageMap = {
    motor: imgMotor,
    'non-motor': imgNonMotor,
    pedestrian: imgPedestrian,
  };
  const { width, height } = size;
  const image = new Image();
  image.src = imageMap[type];

  const imageRotation = type === 'motor' ? rotation * 0.0125 : 0;

  return (
    <Group x={x} y={y} offset={{ x, y }} rotation={imageRotation}>
      <KonvaImage
        image={image}
        x={x - width}
        y={y - height}
        width={width * 2}
        height={height * 2}
      />
    </Group>
  );
};

export default Track;
