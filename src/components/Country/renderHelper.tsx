import type { FormInstance } from 'antd';
import Country from '.';
import React from 'react';

export const renderAreaFormItem = (
  _: any,
  { type, defaultRender, params, ...rest }: any,
  form: FormInstance,
) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Country {...rest} params={params || { cascade: true, needIntersection: false }} />;
  }
  return defaultRender(_);
};

export const renderAreaFormatName = (data: any) => {
  const { countryName = '', provinceName = '', cityName = '', areaName = '' } = data || {};
  return `${countryName}${provinceName}${cityName}${areaName}`;
};
