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
  return `${filter?.hideCountry ? '' : countryName}${provinceName}${cityName}${areaName}${
    filter?.hideIntersection ? '' : intersectionName
  }`;
};

// export const formatAreaByAreaCode = (countries, code) => {
//   let result = '';
//   const countryList = countries[0].children.filter(
//     country => country.code[0] === code[0] && country.code[1] === code[1],
//   );
//   result += countryList[0].name;
//   console.log(countryList);
//   const provinceList = countryList[0].children.filter(
//     province => province.code[2] === code[2] && province.code[3] === code[3],
//   );
//   result += provinceList[0].name;
//   const area = provinceList[0].children.find(p => p.code === code);
//   result += area.name;
//   return result;
// };
