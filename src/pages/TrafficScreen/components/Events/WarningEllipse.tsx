import React from 'react';
import { Ellipse } from 'react-konva';

const WarningEllipse: React.FC<any> = ({ x, y, ...props }) => (
  <Ellipse x={x} y={y} radiusX={26} radiusY={20} strokeWidth={2} {...props} />
);

export default WarningEllipse;
