declare namespace API {
  type PageParams = {
    sortDir?: 'asc' | 'desc';
    pageNum?: number;
    pageSize?: number;
  };

  type CountryParams = {
    cascade: boolean;
    // 是否展示路口
    needIntersection?: boolean;
  };
}
