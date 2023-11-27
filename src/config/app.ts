export const APP_CONFIG = {
  STRAPI: {
    URL: process.env.NEXT_PUBLIC_CMS_URL,
    MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_ORIGIN || process.env.NEXT_PUBLIC_CMS_URL,
    API_URL: `${process.env.NEXT_PUBLIC_CMS_URL}/api`,
    PROXY_API_URL: '/api/cms',
    ACCESS_TOKEN: process.env.STRAPI_TOKEN,
  },
}
