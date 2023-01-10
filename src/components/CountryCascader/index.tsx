import { countries } from '#/services/api/center/site';
import { fetchCrossingList } from '#/services/api/config/crossing';
import { ProFormCascader } from '@ant-design/pro-components';
import React from 'react';
import { useEffect, useState } from 'react';

type CountryCascaderProps = {
  defaultValue?: string[];
  mapChange: (data?: {
    type: 1 | 2;
    id: number;
    code: string;
    lngLat: [number, number] | [];
  }) => void;
};

const CountryCascader: React.FC<CountryCascaderProps> = ({ defaultValue, mapChange }) => {
  const [areaCode, setAreaCode] = useState<string>();
  const [crossing, setCrossing] = useState([]);
  const fetchData = async () => {
    const result = await fetchCrossingList({
      pageNum: 1,
      pageSize: -1,
    });
    setCrossing(result.data);
  };

  const changeCode = () => {
    const result = crossing.find(c => c.code === areaCode);
    if (result) {
      mapChange({
        type: 1,
        id: result.id,
        code: result.code,
        lngLat: result.lng && result.lat ? [result.lng, result.lat] : [],
      });
    } else {
      mapChange(undefined);
    }
  };

  useEffect(() => {
    changeCode();
  }, [areaCode]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="f">
      <ProFormCascader
        fieldProps={{
          allowClear: false,
          fieldNames: { label: 'name', value: 'code' },
          defaultValue,
          onChange: ([, , , , code]: (string | number)[]) => setAreaCode(code as string),
        }}
        request={async () => {
          const res = await countries();
          return res;
        }}
        label={t('Address')}
      />
    </div>
  );
};

export default CountryCascader;
