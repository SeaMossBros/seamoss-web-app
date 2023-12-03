import qs from 'qs'

import { HomePage, HomePage_Plain } from '@/types/HomePage'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class SingleTypeService extends CMSService {
  static queryKeys = {
    getHomePageData: () => ['/home-page'],
  }

  getHomePageData = async () => {
    const url = `${this.baseURL}/home-page`
    const query: QueryParams<HomePage_Plain> = {
      populate: ['hero_images'],
    }
    const search = qs.stringify(query, {
      addQueryPrefix: true,
    })

    const res = await fetch(`${url}${search}`)

    return res.json() as Promise<QueryResponse<HomePage>>
  }
}
