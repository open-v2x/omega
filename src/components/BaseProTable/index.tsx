import React, { MutableRefObject } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import type { TableProps } from 'antd';
import type { OptionConfig, ToolBarProps } from '@ant-design/pro-table/es/components/ToolBar';
import type { ExpandableConfig } from 'antd/lib/table/interface';
import { ProFormInstance, ProTable } from '@ant-design/pro-components';
import { ProColumns } from '#/typings/pro-component';

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
  scroll?: { x: number };
  headerTitle?: string | React.ReactNode;
  toolBarRender?: ToolBarProps<any>['toolBarRender'] | false;
  options?: false | OptionConfig;
  expandable?: ExpandableConfig<any>;
  editable?: any;
  formRef?: MutableRefObject<ProFormInstance>;
  onDataSourceChange?: (dataSource: any[]) => void;
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
    scroll = columns.length > 6 ? { x: 1400 } : null,
    headerTitle,
    toolBarRender,
    options,
    expandable,
    editable,
    formRef,
    onDataSourceChange,
  } = props;

  /**
   * @description: 获取处理后的columns
   * @return {*}
   */
  const getColumns = () => {
    const newColumns = columns
      .filter(c => !c.hidden)
      .map(col => ({
        ...col,
        search: col.search || false,
      }));

    return newColumns;
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
      request={async (param, { createTime }) => {
        if (createTime) {
          param.sortDir = createTime === 'ascend' ? 'asc' : 'desc';
        }
        const res = await request?.(param);
        return { data: res?.data, total: res?.total, success: true };
      }}
      params={params}
      rowSelection={rowSelection}
      rowKey={rowKey}
      search={search}
      pagination={getPagination()}
      scroll={scroll}
      headerTitle={headerTitle}
      toolBarRender={toolBarRender}
      options={options}
      expandable={expandable}
      editable={editable}
      formRef={formRef}
      onDataSourceChange={onDataSourceChange}
    />
  );
};

export default BaseProTable;
