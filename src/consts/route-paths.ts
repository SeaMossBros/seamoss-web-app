export const ROUTE_PATHS = {
  HOME: '/',
  PRODUCT: {
    INDEX: '/products',
    SLUG: '/products/{slug}',
  },
  SUPPORT: '/support',
  ABOUT: '/about-us',
  CART: '/cart',
  BLOG: {
    INDEX: '/blogs',
    SINGULAR: '/blogs/{slug}',
    DOUBLE: '/blogs/{slug_1}{slug_2}',
    CREATE: '/blogs/new',
  },
  LOGIN: '/auth/login',
}
