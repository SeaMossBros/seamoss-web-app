import qs from 'qs';
import axios from 'axios';

import { Article, Article_NoRelations, Article_Plain } from '@/types/Article'
import { Author, Author_NoRelations, Author_Plain } from '@/types/Author'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class BlogService extends CMSService {
  static queryKeys = {
    list: (params: QueryParams<Article_Plain>) => ['/articles', JSON.stringify(params)],
    getBySlug: (slug: string, params?: QueryParams<Article_NoRelations>) => [
      '/slugify/slugs/article',
      slug,
      JSON.stringify(params),
    ],
    listAuthors: (params?: QueryParams<Author_NoRelations>) => ['/authors', JSON.stringify(params)],
    listAuthorsWithAvatar: (params?: QueryParams<Author_NoRelations>) => ['/authors', JSON.stringify(params)],
  }

  list = async (params: QueryParams<Article_Plain>) => {
    const url = `${this.baseURL}/articles${qs.stringify(params, {
      addQueryPrefix: true,
    })}`

    const res = await fetch(url, {
      headers: this.headers,
      cache: 'no-cache',
    })

    return res.json() as Promise<QueryResponse<Article[]>>
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

  update = async (id: number, article: Partial<Article_NoRelations>) => {
    const url = `${this.baseURL}/articles/${id}`

    const payload = {
      data: article,
    }

    const res = await fetch(url, {
      method: 'put',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    return res.json() as Promise<QueryResponse<Article>>
  }

  delete = async (id: number) => {
    const url = `${this.baseURL}/articles/${id}`

    const res = await fetch(url, {
      method: 'delete',
      headers: this.headers,
    })

    return res.json()
  }

  getBySlug = async (slug: string, params?: QueryParams<Article_NoRelations>): Promise<QueryResponse<Article>> => {
    const url = `${this.baseURL}/slugify/slugs/article/${slug}`;
    const search = qs.stringify(params);

    try {
      const res = await axios.get(`${url}?${search}`, {
        headers: {
          ...this.headers,
          'Cache-Control': 'no-cache, no-store, must-revalidate', // Instructs the cache to not store the response
          Pragma: 'no-cache', // Legacy HTTP/1.0 servers and proxies
          Expires: '0', // Proxies
        }
      });
      // console.log('res:', res);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        throw new Error(`Failed to fetch article by slug: ${slug}, status: ${error.response?.status}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error(`Unexpected error occurred while fetching article by slug: ${slug}`);
      }
    }
  }

  listAuthors = async (params?: QueryParams<Author_NoRelations>) => {
    const url = `${this.baseURL}/authors${qs.stringify(params, {
      addQueryPrefix: true,
    })}`

    const res = await fetch(`${url}`, {
      headers: this.headers,
      cache: 'no-store',
    })

    return res.json() as Promise<QueryResponse<Author[]>>
  }

  listAuthorsWithAvatar = async (params?: QueryParams<Author_Plain>) => {
    const url = `${this.baseURL}/authors${qs.stringify({
      ...params,
      populate: ['avatar']
    }, {
      addQueryPrefix: true,
    })}`

    const res = await fetch(`${url}`, {
      headers: this.headers,
      cache: 'no-store',
    })

    return res.json() as Promise<QueryResponse<Author_Plain[]>>
  }
}
