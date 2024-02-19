import QueryString from 'qs'

import { Media_Plain } from '@/types/Media';
import axios from 'axios';

import CMSService from './core/cms.service'
import { APP_CONFIG } from '@/config/app';

export default class FileService extends CMSService {
  newBaseUrl = APP_CONFIG.STRAPI.MEDIA_URL;
  newHeaders = {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  }
  upload = async (files: File[]) => {
    const url = `${this.newBaseUrl}/upload`

    const data = new FormData()
    console.log('data before', data);
    
    files.forEach((file) => data.append('files', file))
    console.log('data after', data);
    console.log('newHeaders', this.newHeaders);

    const res = await fetch(url, {
      headers: this.newHeaders,
      method: 'post',
      body: data,
    })

    console.log('res', res);
    return res.json() as Promise<Media_Plain[]>
  }

  uploadFileInfo = async (id: number, info: Pick<Media_Plain, 'alternativeText'>) => {
    const url = `${this.newBaseUrl}/upload${QueryString.stringify(
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
      headers: this.newHeaders,
      method: 'post',
      body: data,
    })

    return res.json() as Promise<Media_Plain>
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