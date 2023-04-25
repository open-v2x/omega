import { fetchCountries } from '#/services/api/device/device';
import { ProFormCascader } from '@ant-design/pro-form';
import React from 'react';

const Country: React.FC<any> = props => {
  const { params, filter, ...values } = props;
  return (
    <ProFormCascader
      {...values}
      fieldProps={{ fieldNames: { label: 'name', value: 'code' } }}
      request={async () => {
        const countries = await fetchCountries({
          ...params,
        });
        return filter?.country ? countries : countries[0]?.children;
      }}
    />
  );
};

export default Country;
