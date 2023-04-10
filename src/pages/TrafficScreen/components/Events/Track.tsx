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
}> = ({ type, x, y, rotation }) => {
  const imageMap = {
    motor: imgMotor,
    'non-motor': imgNonMotor,
    pedestrian: imgPedestrian,
  };
  const image = new Image();
  image.src = imageMap[type];
  const imageWidth = 20;

  const imageRotation = type === 'motor' ? rotation * 0.0125 : 0;

  return (
    <Group x={x} y={y} offset={{ x, y }} rotation={imageRotation}>
      <KonvaImage
        image={image}
        x={x - imageWidth}
        y={y - imageWidth}
        width={imageWidth * 2}
        height={imageWidth * 2}
      />
    </Group>
  );
};

export default Track;
