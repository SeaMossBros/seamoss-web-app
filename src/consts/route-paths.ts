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
    DOUBLE: '/blogs/?blog_1={slug_1}&blog_2={slug_2}',
    CREATE: '/blogs/new',
  },
  LOGIN: '/login',
  PROFILE: {
    INDEX: '/profile',
    ORDERS: '/profile/orders',
    NOTIFICATIONS: '/profile/notifications',
    SETTINGS: '/profile/settings',
    REVIEWS: '/profile/reviews',
    CHANGE_PASSWORD: '/profile/change-password',
  },
  FORGOT_PASSWORD: '/forgot-password',
}
