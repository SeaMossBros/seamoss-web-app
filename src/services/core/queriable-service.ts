export interface QueriableService {
  queryKeys: Record<string, () => string[]>
}
