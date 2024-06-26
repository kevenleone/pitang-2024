export type PaginationResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
};
