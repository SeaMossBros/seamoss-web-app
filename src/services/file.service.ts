import { Media_Plain } from '@/types/Media'

import CMSService from './core/cms.service'

export default class FileService extends CMSService {
  upload = async (files: File[]) => {
    const url = `${this.baseURL}/upload`

    const data = new FormData()

    files.forEach((file) => data.append('files', file))

    const res = await fetch(url, {
      method: 'post',
      body: data,
    })

    return res.json() as Promise<Media_Plain[]>
  }
}
