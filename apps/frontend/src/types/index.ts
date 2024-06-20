export type Shortner = {
  createdAt: string;
  expireAt: string;
  hash: string;
  hits: number;
  id: string;
  url: string;
  user: any;
};

export type ShortnerResponse = {
  items: Shortner[];
  page: number;
  pageSize: number;
  totalCount: number;
};
