import React from 'react';
import imgMotor from '#/assets/images/motor.png';
import imgNonMotor from '#/assets/images/non_motor.png';
import imgPedestrian from '#/assets/images/pedestrian.png';
import { Group, Image as KonvaImage } from 'react-konva';

const ThunderVisionTrack: React.FC<{ box: any; label: number }> = ({ box, label }) => {
  const x = box[0];
  const y = box[1];
  const angle = box[2];

  console.log('展示', angle, x, y, label);

  const imageMap = [imgMotor, imgPedestrian, imgPedestrian, imgNonMotor];

  const image = new Image();
  image.src = imageMap[label - 1];
  const imageWidth = 20;

  const imageRotation = angle * (180 / Math.PI);

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
