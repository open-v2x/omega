declare namespace API {
  type PageParams = {
    sortDir?: 'asc' | 'desc';
    pageNum?: number;
    pageSize?: number;
  };

  type CountryParams = {
    cascade: boolean;
    needIntersection?: boolean;
  };
}
