export interface PageInfo {
  total: number
  per_page: number
  current_page: number
  total_pages: number
}

export interface ObjectLiteral {
  [s: string]: any;
}

export class Pagination<PaginationObject, T extends ObjectLiteral = PageInfo> {
  constructor(
    public readonly data: PaginationObject[],
    public readonly meta: T,
  ) {}
}