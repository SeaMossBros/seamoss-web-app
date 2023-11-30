import QueryString from 'qs'

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

  uploadFileInfo = async (id: number, info: Pick<Media_Plain, 'alternativeText'>) => {
    const url = `${this.baseURL}/upload${QueryString.stringify(
      {
        id,
      },
      {
        addQueryPrefix: true,
      },
    )}`

    const data = new FormData()

    data.append('fileInfo', JSON.stringify(info))

    const res = await fetch(url, {
      method: 'post',
      body: data,
    })

    return res.json() as Promise<Media_Plain>
  }
}
