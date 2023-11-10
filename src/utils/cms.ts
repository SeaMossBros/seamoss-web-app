import { APP_CONFIG } from "@/config/app";

export function getStrapiUploadUrl(url: string) {
  return APP_CONFIG.STRAPI.URL + url
}