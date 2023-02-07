/* eslint-disable jsx-a11y/anchor-is-valid */
import { Space, Table } from 'antd';
import React from 'react';
import styles from './controlTable.module.less';
import { useCenterStore } from '#/store/center';
import { CaretRightOutlined } from '@ant-design/icons';

const ControlTable: React.FC<{
  title: string;
  dataName: string;
  onCallback: (params: any) => void;
}> = ({ title, dataName, onCallback }) => {
  const columns = [
    { title: title, dataIndex: 'name', key: 'name', className: styles['control-table-row'] },
    {
      title: t('Running Status'),
      dataIndex: 'status',
      key: 'status',
      className: styles['control-table-row'],
    },
    {
      key: 'action',
      className: styles['control-table-row'],
      render: (_, record) => (
        <Space size="middle">
          <CaretRightOutlined onClick={() => onCallback(record)} />
        </Space>
      ),
    },
  ];

  const data = useCenterStore(state => state[dataName]);
  return (
    <div className={styles['control-table-container']}>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={data}
        pagination={false}
        size={'small'}
        scroll={{ y: '100px' }}
        rowClassName={styles['control-table-row']}
      />
    </div>
  );
};

export default ControlTable;
