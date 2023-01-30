import React from 'react';
import imgEventWarn from '#/assets/images/event_warn.png';
import { Image as KonvaImage } from 'react-konva';

const WarningImage: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const image = new Image();
  image.src = imgEventWarn;
  const iconWidth = 15;

  return (
    <KonvaImage
      image={image}
      x={x - iconWidth}
      y={y - iconWidth * 2.5}
      width={iconWidth * 2}
      height={iconWidth * 2}
    />
  );
};

export default WarningImage;
