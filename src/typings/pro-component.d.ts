declare module '@ant-design/pro-table' {
  export declare type ProColumns<T = any, ValueType = 'text'> = Omit<
    ProColumnGroupType<T, ValueType>,
    'search'
  > & {
    search?: boolean | SearchConfig;
    hidden?: boolean;
  };
}

import type { FieldType } from './FormField';

type FormItemType = {
  type?: FieldType;
  required?: boolean;
  width?: number | 'lg' | 'sm' | 'md' | 'xl' | 'xs';
  name?: NamePath;
  label?: string | React.ReactNode;
  tooltip?: LabelTooltipType;
  fieldProps?: FieldProps &
    InputProps &
    RadioGroupProps &
    InputNumberProps<string | number> &
    CascaderProps<any> &
    SelectProps<any, DefaultOptionType>;
  disabled?: boolean;
  min?: number | Number.MIN_SAFE_INTEGER;
  rules?: Rule[];
  options?: (string | number | CheckboxOptionType)[] & (DefaultOptionType[] | string[]);
  valueEnum?:
    | ProSchemaValueEnumObj
    | ProSchemaValueEnumMap
    | ((row: Record<string, any>) => ProSchemaValueEnumObj | ProSchemaValueEnumMap)
    | undefined;
  request?: ProFieldRequestData<any>;
  title?: string;
  icon?: React.ReactNode;
  max?: number;
  components?: React.ReactNode | React.ReactNode[];
  hidden?: boolean;
};
type FormGroupType = {
  key: string;
  title?: string;
  children?: FormItemType[];
  components?: React.ReactNode | React.ReactNode[];
  hidden?: boolean;
};

type CreateModalProps = {
  editId?: number; // 编辑id
  editInfo?: { id: number } & Record<
    string,
    string | number | boolean | Record<string, string | number | boolean>[]
  >; // 编辑信息
  isDetails?: boolean; // 是否详情
  success: () => void; // 创建或编辑成功回调
};
