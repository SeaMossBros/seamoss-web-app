import qs from 'qs'

import { HomePage, HomePage_Plain } from '@/types/HomePage'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'
import { SupportPage, SupportPage_Plain } from '@/types/SupportPage'

import CMSService from './core/cms.service'

export default class SingleTypeService extends CMSService {
  static queryKeys = {
    getHomePageData: () => ['/home-page'],
    getSupportPageData: () => ['/support-page'],
  }

  getHomePageData = async () => {
    const url = `${this.baseURL}/home-page`
    const query: QueryParams<HomePage_Plain> = {
      populate: ['hero_images'],
    }
    const search = qs.stringify(query, {
      addQueryPrefix: true,
    })

    console.log('fetching homepage images...')
    console.log('url:', url)
    console.log('search:', search)

    const res = await fetch(`${url}${search}`, {
      cache: 'no-cache',
    })

    const resD = await res.json()
    console.log('res:', resD)

    return resD as Promise<QueryResponse<HomePage>>
  }

  getSupportPageData = async () => {
    const url = `${this.baseURL}/support-page`
    const query: QueryParams<SupportPage_Plain> = {
      populate: ['hero_images'],
    }
    const search = qs.stringify(query, {
      addQueryPrefix: true,
    })

    // console.log(`${url}${search}`);
    const res = await fetch(`${url}${search}`, {
      cache: 'no-cache',
    })

    return res.json() as Promise<QueryResponse<SupportPage>>
  }
}
