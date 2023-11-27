import { APP_CONFIG } from '@/config/app'

export function getStrapiUploadUrl(url: string) {
  if (APP_CONFIG.STRAPI.MEDIA_URL && url.startsWith(APP_CONFIG.STRAPI.MEDIA_URL)) return url
  return APP_CONFIG.STRAPI.MEDIA_URL + url
}
