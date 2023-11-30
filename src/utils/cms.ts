import { APP_CONFIG } from '@/config/app'

export function getStrapiUploadUrl(url: string) {
  if (url.startsWith('http')) return url
  return APP_CONFIG.STRAPI.MEDIA_URL + url
}
