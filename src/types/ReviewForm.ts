import { ProductReview_Plain } from './ProductReview'

export type ReviewFormData = {
  rating: ProductReview_Plain['rating']
  user_name: ProductReview_Plain['user_name']
  user_email: ProductReview_Plain['user_email']
  comment?: ProductReview_Plain['comment']
  attachments?: ProductReview_Plain['attachments']
}
