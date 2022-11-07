export interface IResponseData<T> {
  detail: string;
  data: T;
}

export interface IResponseListData<T> {
  detail: string;
  data: T[];
  total: number;
}

export type RSBoolean = IResponseData<boolean>;

export type RSString = IResponseData<string>;
