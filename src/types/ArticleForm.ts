import { Article_NoRelations } from './Article'

export type ArticleFormData = {
  title: Article_NoRelations['title']
  introduction: Article_NoRelations['introduction']
  content: Article_NoRelations['content']
  cover_image: Article_NoRelations['cover_image']
}
