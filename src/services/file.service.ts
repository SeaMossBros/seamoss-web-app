import axios from 'axios'
import QueryString from 'qs'

import { Media_Plain } from '@/types/Media'

import CMSService from './core/cms.service'

export default class FileService extends CMSService {
  upload = async (files: File[]) => {
    // TODO: Review comment file upload flow is not working
    const url = `${this.baseURL}/upload`

    const data = new FormData()

    files.forEach((file) => data.append('files', file))

    const res = await axios(url, {
      headers: this.headers,
      method: 'post',
      data: data,
    })

    // console.log('res', res)
    return res.data as Promise<Media_Plain[]>
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

    const res = await axios(url, {
      headers: this.headers,
      method: 'post',
      data: data,
    })

    return res.data as Promise<Media_Plain>
  }
}

// upload = async (files: File[]): Promise<Media_Plain[]> => {
//   const url = `${this.baseURL}/upload`;

//   try {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     const res = await axios(url, {
//       method: 'POST',
//       data: formData,
//       headers: {
//         ...this.headers,
//         'Content-Type': 'multipart/form-data'
//       }
//     })

//     console.log('res:::', res);
//     return res.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Axios error:', error.response?.data);
//       throw new Error(`Failed to save files, status: ${error.response?.status}`);
//     } else {
//       console.error('Unexpected error:', error);
//       throw new Error('Unexpected error occurred while saving files');
//     }
//   }
// }
