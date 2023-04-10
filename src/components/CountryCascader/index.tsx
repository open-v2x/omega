import { areas } from '#/services/api/center/site';
import { fetchCrossingList } from '#/services/api/config/crossing';
import { ProFormCascader } from '@ant-design/pro-components';
import React from 'react';
import { useEffect, useState } from 'react';

type CountryCascaderProps = {
  colon?: boolean;
  defaultValue?: string[];
  mapChange: (data?: {
    type: 1 | 2;
    id: number;
    code: string;
    lngLat: [number, number] | [];
  }) => void;
  labelClass?: string;
};

const CountryCascader: React.FC<CountryCascaderProps> = ({
  colon = true,
  defaultValue,
  mapChange,
  labelClass,
}) => {
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
          onChange: ([, code]: (string | number)[]) => setAreaCode(code as string),
        }}
        request={async () => {
          const res = await areas();
          return res;
        }}
        colon={colon}
        label={<div className={labelClass}>{t('Address')}</div>}
      />
    </div>
  );
};

export default CountryCascader;
