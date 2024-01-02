import { APP_CONFIG } from '@/config/app'
import { isServerSide } from '@/utils/environment'

export default class CMSService {
  protected baseURL = APP_CONFIG.STRAPI.API_URL // isServerSide() ? APP_CONFIG.STRAPI.API_URL : APP_CONFIG.STRAPI.PROXY_API_URL
  protected headers = isServerSide()
    ? {
      Authorization: `Bearer ${APP_CONFIG.STRAPI.ACCESS_TOKEN}`,
    }
    : undefined
}
