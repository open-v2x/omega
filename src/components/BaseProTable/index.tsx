import React, { MutableRefObject, useState } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { Dropdown, MenuProps, Space, TableProps } from 'antd';
import type { OptionConfig, ToolBarProps } from '@ant-design/pro-table/es/components/ToolBar';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import { ProFormInstance, ProTable } from '@ant-design/pro-components';
import { ProColumns } from '#/typings/pro-component';
import type { ColumnsStateType } from '@ant-design/pro-table/es/typing';
import { DownOutlined } from '@ant-design/icons';

type BaseProTableType = {
  columns: ProColumns[];
  bordered?: boolean;
  actionRef?: React.Ref<ActionType | undefined> | undefined;
  dataSource?: any[];
  params?: Record<string, string | number>;
  request?: (params: any) => Promise<Partial<any>>;
  rowSelection?:
    | (TableProps<any>['rowSelection'] & {
        alwaysShowAlert?: boolean;
      })
    | false;
  rowKey?: string;
  search?: false | { labelWidth: number };
  pagination?: { pageSize: number } | false;
  headerTitle?: string | React.ReactNode;
  toolBarRender?: ToolBarProps<any>['toolBarRender'] | false;
  options?: false | OptionConfig;
  expandable?: ExpandableConfig<any>;
  editable?: any;
  formRef?: MutableRefObject<ProFormInstance>;
  onDataSourceChange?: (dataSource: any[]) => void;
  rowActions?: {
    firstAction?: (row: any) => React.ReactNode;
    moreActions?: (row: any) => MenuProps['items'];
  };
  columnsState?: ColumnsStateType;
};

const BaseProTable: React.FC<BaseProTableType> = props => {
  const {
    bordered = false,
    columns = [],
    actionRef,
    dataSource,
    request,
    params,
    rowSelection,
    rowKey = 'id',
    search = { labelWidth: 0 },
    pagination = { pageSize: 10 },
    headerTitle,
    toolBarRender,
    options,
    expandable,
    editable,
    formRef,
    onDataSourceChange,
    rowActions,
    columnsState,
  } = props;

  const [isScroll, setIsScroll] = useState(false);

  /**
   * @description: 获取处理后的columns
   * @return {*}
   */
  const getColumns = (): ProColumns<any>[] => {
    const rowActionColumns = {
      title: t('Operate'),
      width: 110,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        const { firstAction, moreActions } = rowActions;
        const result = [];
        if (firstAction) {
          result.push(firstAction(record));
        }
        if (moreActions?.length > 0) {
          result.push(
            <Dropdown menu={{ items: moreActions(record) }}>
              <a onClick={e => e.preventDefault()}>
                <Space style={{ paddingRight: 4 }}>{t('More')}</Space>
                <DownOutlined />
              </a>
            </Dropdown>,
          );
        }
        return result;
      },
    };

    const newColumns = columns
      .filter(c => !c.hidden)
      .map(col => ({
        ...col,
        search: col.search || false,
      }));

    return rowActions ? [...newColumns, rowActionColumns] : newColumns;
  };

  const getPagination = () => {
    if (pagination) {
      const newPagination = {
        defaultPageSize: pagination.pageSize,
      };
      return newPagination;
    }
    return pagination;
  };

  return (
    <ProTable
      bordered={bordered}
      columns={getColumns()}
      actionRef={actionRef}
      dataSource={dataSource}
      columnsState={columnsState}
      onColumnsStateChange={map => {
        console.log('columnsStateChanged', map);
      }}
      request={async (param, { createTime }) => {
        if (createTime) {
          param.sortDir = createTime === 'ascend' ? 'asc' : 'desc';
        }
        const res = await request?.(param);
        setIsScroll(res?.total > 5 ? true : false);
        return { data: res?.data, total: res?.total, success: true };
      }}
      params={params}
      rowSelection={rowSelection}
      rowKey={rowKey}
      search={search}
      pagination={getPagination()}
      headerTitle={headerTitle}
      toolBarRender={toolBarRender}
      options={options}
      expandable={expandable}
      editable={editable}
      formRef={formRef}
      scroll={isScroll ? { x: 'max-content', y: '50vh' } : { x: 'max-content' }}
      onDataSourceChange={onDataSourceChange}
    />
  );
};

export default BaseProTable;
