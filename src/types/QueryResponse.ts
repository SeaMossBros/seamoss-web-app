export interface PaginationMeta {
  page: number
  pageSize: number
  pageCount: number
  total?: number
}

export type WithMetadata<TData> = {
  id: number
  attributes: Omit<TData, 'id'>
  meta?: object
}

export interface QueryResponse<TData = any> {
  data: TData | null
  meta: {
    pagination: PaginationMeta
  }
}
