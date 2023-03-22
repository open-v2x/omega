import { InfoMapType } from '#/typings/pro-component';
import { Tooltip } from 'antd';
import React from 'react';

type ParameterInfoType = {
  infoMap: InfoMapType[];
  info: React.ReactNode;
};

const ParameterInfo: React.FC<ParameterInfoType> = ({ infoMap, info }) => (
  <>
    {infoMap.map(({ key, label, unit, render }) => {
      const value = info![key];
      const renderText = render ? render(value) : value || '-';
      const valueText = value ? unit ?? t('bars/s') : '';
      const text = `${label}：${renderText} ${valueText}`;
      return (
        <div key={key} className="ellipsis">
          <Tooltip title={text}>{text}</Tooltip>
        </div>
      );
    })}
  </>
);

export default ParameterInfo;
