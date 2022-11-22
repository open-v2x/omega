import { fetchCountries } from '#/services/api/device/device';
import { ProFormCascader } from '@ant-design/pro-form';
import React from 'react';

const Country: React.FC<any> = props => (
  <ProFormCascader
    {...props}
    fieldProps={{ fieldNames: { label: 'name', value: 'code' } }}
    request={async () => {
      const countries = await fetchCountries();
      return countries;
    }}
  />
);

export default Country;
