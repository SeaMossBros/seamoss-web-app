import { APP_CONFIG } from '@/config/app'

export function getStrapiUploadUrl(url: string) {
  console.log({
    url,
  })
  if (APP_CONFIG.STRAPI.URL && url.startsWith(APP_CONFIG.STRAPI.URL)) return url
  return APP_CONFIG.STRAPI.URL + url
}
