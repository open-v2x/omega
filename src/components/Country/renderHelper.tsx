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
    return <Country {...rest} params={params || { cascade: true, needIntersection: true }} />;
  }
  return defaultRender(_);
};

export const renderAreaFormatName = (
  data: any,
  filter?: { hideCountry?: boolean; hideIntersection?: boolean },
) => {
  const {
    countryName = '',
    provinceName = '',
    cityName = '',
    areaName = '',
    intersectionName = '',
  } = data || {};
  if (provinceName || cityName || areaName) {
    return `${filter?.hideCountry ? '' : countryName}${provinceName}${cityName}${areaName}${
      filter?.hideIntersection ? '' : intersectionName
    }`;
  } else {
    return '-';
  }
};
