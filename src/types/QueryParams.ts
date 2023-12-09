// Documentation: https://docs.strapi.io/dev-docs/api/rest/parameters

export enum FilterOp {
  eq = '$eq',
  eqi = '$eqi',
  ne = '$ne',
  nei = '$nei',
  lt = '$lt',
  lte = '$lte',
  gt = '$gt',
  gte = '$gte',
  in = '$in',
  notIn = '$notIn',
  contains = '$contains',
  notContains = '$notContains',
  containsi = '$containsi',
  notContainsi = '$notContainsi',
  null = '$null',
  notNull = '$notNull',
  between = '$between',
  startsWith = '$startsWith',
  startsWithi = '$startsWithi',
  endsWith = '$endsWith',
  endsWithi = '$endsWithi',
  or = '$or',
  and = '$and',
  not = '$not',
}

export type FilterOptions<TData> = Partial<
  Record<keyof TData, string | number | boolean | Partial<Record<FilterOp, any>>>
>

export type PaginationOptions = {
  page?: number
  pageSize?: number
  withCount?: boolean
}

export type DeepPopulation<TData> = {
  populate?: Population<TData>
}

export type Population<TData> =
  | '*'
  | Array<keyof TData>
  | {
      [key: string]: DeepPopulation<any> | true
    }

export interface QueryParams<TData = any> {
  populate?: Population<TData>
  fields?: Array<keyof TData>
  filters?: FilterOptions<TData>
  locale?: string | string[]
  publicationState?: 'live' | 'preview'
  sort?: string | string[]
  pagination?: PaginationOptions
}
