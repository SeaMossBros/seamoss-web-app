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
    INDEX: '/profile/',
    ORDERS: '/profile/orders',
    NOTIFICATIONS: '/profile/notifications',
    SETTINGS: '/profile/settings',
    REVIEWS: '/profile/reviews',
    CHANGE_PASSWORD: '/profile/change-password',
  }
  // TODO: steps to load the profile
  // after paying using stripe checkout and when navigated to success page (first of all, remove the intermediary modal that says "Your payment has been received. Thank you for your purchase!")
  // then, grab the orderId (`id` in the res obj), stripeSessionId (as `payment_session_id` in res), email (as `user_email` in res)
  // 
  // try to fetch user from strapi by email
  // if (user exists) {
  //  navigate to /profile/orders
  // } else if (user does not exist) {
  //  auto-create a (an?) username from the email (e.g. "test.user123@mail.com" => "test.user123")
  //  auto-create a temporary password
  //  navigate to /profile/orders
  //  prompt users to reset-their password via email link
  // }
  // 
  // a users orders list should have pagination and each item should include total item count, total price, 
  // and action buttons that all open a modal:
  //  1. order details (which displays the products purchased in mre detail and other stats like shipping info and package tracking once available)
  //  2. cancel order (if available)
  //  3. manage subscription (if subscription) // * this will redirect user to Stripe manage subscription screen
}
