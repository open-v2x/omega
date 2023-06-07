import React from 'react';
import imgMotor from '#/assets/images/motor.png';
import imgNonMotor from '#/assets/images/non_motor.png';
import imgPedestrian from '#/assets/images/pedestrian.png';
import { Group, Image as KonvaImage } from 'react-konva';

const ThunderVisionTrack: React.FC<{ box: any; label: number }> = ({ box, label }) => {
  const x = box[0];
  const y = box[1];
  const angle = box[2];

  // console.log('展示', x, y, angle, label);

  const imageMap = [
    imgMotor,
    imgPedestrian,
    imgPedestrian,
    imgNonMotor,
    imgMotor,
    imgMotor,
    imgMotor,
    imgMotor,
  ];

  const image = new Image();
  image.src = imageMap[label - 1];
  const imageWidth = 20;

  const initRotation = 90;
  const rotationAngle = angle * 57.3;

  const imageRotation = label === 1 ? initRotation - rotationAngle : 0;

  // console.log('转化后的角度', imageRotation);

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

export default ThunderVisionTrack;
