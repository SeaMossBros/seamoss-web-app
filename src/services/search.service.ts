import qs from 'qs'

import { SearchParams, SearchResponse } from '@/types/Search'

import CMSService from './core/cms.service'

export default class SearchService extends CMSService {
  static queryKeys = {
    search: (query: string, params?: SearchParams) => ['/search', query, params],
  }

  search = async (query: string, params?: SearchParams) => {
    const url = `${this.baseURL}/fuzzy-search/search?${qs.stringify({
      query,
      ...params,
    })}`

    const res = await fetch(url, {
      headers: this.headers,
      cache: 'no-cache',
    })

    return res.json() as Promise<SearchResponse>
  }
}
