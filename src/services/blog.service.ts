import qs from 'qs'

import { Blog } from '@/types/Blog'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse, WithMetadata } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export default class BlogService extends CMSService {
  static queryKeys = {
    create: () => ['/blogs'],
    list: (params?: QueryParams<Blog>) => ['/Blogs', params],
  }

  list = async (params?: QueryParams<Blog>) => {
    try {
      const url = `${this.baseURL}/blog`
      const search = qs.stringify(params)
      return fetch(`${url}?${search}`, {
        headers: this.headers,
      }).then((res) => res.json() as Promise<QueryResponse<Array<WithMetadata<Blog>>>>)
    } catch (error) {
      console.error(error)
    }
  }

  create = async (blogData: Blog) => {
    try {
      console.log('blog data', blogData)
      const url = `${this.baseURL}/blogs`
      const search = qs.stringify(blogData)

      return fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: search,
      }).then((res) => res.json() as Promise<QueryResponse<WithMetadata<Blog>>>)
    } catch (err) {
      console.error(err)
    }
  }

  // Add other methods as needed
}
