import qs from 'qs'

import { Article, Article_NoRelations } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class BlogService extends CMSService {
  static queryKeys = {
    getBySlug: (slug: string, params?: QueryParams<Article_NoRelations>) => [
      '/slugify/slugs/article',
      slug,
      params,
    ],
  }

  create = async (article: Partial<Article_NoRelations>) => {
    const url = `${this.baseURL}/articles`

    const payload = {
      data: article,
    }

    const res = await fetch(url, {
      method: 'post',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    return res.json() as Promise<QueryResponse<Article>>
  }

  getBySlug = async (slug: string, params?: QueryParams<Article_NoRelations>) => {
    const url = `${this.baseURL}/slugify/slugs/article/${slug}`
    const search = qs.stringify(params)

    return fetch(`${url}?${search}`, {
      headers: this.headers,
      cache: 'no-store',
    }).then((res) => res.json()) as Promise<QueryResponse<Article>>
  }
}
