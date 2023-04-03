import BaseContainer from '#/components/BaseContainer';
import { DeviceStatusOptions } from '#/constants/edge';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType, EditableFormInstance, EditableProTable } from '@ant-design/pro-components';
import React, { FC, useRef, useState } from 'react';
import { fetchAlgorithmList, updateAlgorithm } from '#/services/api/algorithm';
import styles from './index.module.less';
import { Button, message } from 'antd';

const AlgorithmConfig: FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [editStatus, setEditStatus] = useState(false);
  const editorFormRef = useRef<EditableFormInstance<Config.AlgorithmListItem>>();

  const [data, setData] = useState<readonly Config.AlgorithmListItem[]>([]);
  const columns: ProColumns<Config.AlgorithmListItem>[] = [
    {
      title: t('Algorithm Module'),
      dataIndex: 'module',
      editable: false,
      search: false,
    },
    {
      title: t('Algorithm Name'),
      dataIndex: 'algo',
      editable: false,
    },
    {
      title: t('Version Name'),
      dataIndex: 'inUse',
      key: 'inUse',
      valueType: 'select',
      valueEnum: entity => {
        const result = {};
        entity.version?.map((v: string) => {
          result[v] = { text: v };
        });
        return result;
      },
      editable: true,
      search: false,
    },
    {
      title: t('Device Status'),
      dataIndex: 'enable',
      key: 'enable',
      editable: true,
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
      search: false,
      //   @ts-ignore
      renderFormItem: row => <div>{row.valueEnum[editStatus].text}</div>,
    },
    {
      title: t('Update Time'),
      dataIndex: 'updateTime',
      editable: false,
      search: false,
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
            setEditStatus(record.enable);
          }}
        >
          {t('Edit')}
        </a>,
      ],
    },
  ];

  const handleConfig = async () => {
    const params = data.map(d => ({
      module: d.module,
      algo: d.algo,
      enable: d.enable,
      inUse: d.inUse,
    }));
    await updateAlgorithm(params);
    message.success('操作成功');
  };

  return (
    <BaseContainer>
      <EditableProTable<Config.AlgorithmListItem>
        actionRef={actionRef}
        editableFormRef={editorFormRef}
        columns={columns}
        rowKey="id"
        value={data}
        onChange={setData}
        controlled
        search={{ labelWidth: 0, filterType: 'query' }}
        scroll={{ y: '50vh' }}
        editable={{
          type: 'single',
          editableKeys,
          actionRender: (row, config, defaultDoms) => [
            defaultDoms.save,
            <a
              key="set"
              className={editStatus ? styles.disabled : null}
              onClick={() => {
                setEditStatus(!editStatus);
                editorFormRef.current?.setRowData?.(`${config.recordKey}`, {
                  enable: !row.enable,
                });
              }}
            >
              {editStatus ? t('Disabled') : t('Enable')}
            </a>,
          ],
          onChange: setEditableRowKeys,
        }}
        request={async params => {
          const result = await fetchAlgorithmList(params);
          setData(result.data);
          return result;
        }}
        recordCreatorProps={false}
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [<Button onClick={handleConfig}>{t('Config')}</Button>]}
        options={{
          setting: {
            checkable: true,
          },
        }}
      />
    </BaseContainer>
  );
};

export default AlgorithmConfig;
