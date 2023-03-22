import { useCenterStore } from '#/store/center';
import { Select } from 'antd';
import React from 'react';
import styles from './controlRsu.module.less';

const ControlRsu: React.FC = () => {
  const { setCurrentRsuByRsuId } = useCenterStore();
  const rsus = useCenterStore(state => state.rsus);
  const currentRsu = useCenterStore(state => state.currentRSU);
  const handleChangeRSU = (value?: number | string) => {
    setCurrentRsuByRsuId(value);
  };

  return (
    <div className={styles['control-content']}>
      <div className={styles['control-title']}>{t('Select Rsu')}</div>
      <div>
        <Select
          allowClear
          style={{ width: '100%', color: 'white' }}
          onChange={handleChangeRSU}
          onClear={handleChangeRSU}
          bordered={false}
          defaultValue={currentRsu?.rsuId}
        >
          {rsus.map(rsu => (
            <Select.Option key={rsu.rsuId} value={rsu.rsuId}>
              {rsu.rsuName}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ControlRsu;
