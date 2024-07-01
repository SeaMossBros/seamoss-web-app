import { Article_Plain } from './Article'

export type ArticleFormData = {
  title: Article_Plain['title']
  introduction?: Article_Plain['introduction']
  content: Article_Plain['content']
  cover: Article_Plain['cover']
  author: Article_Plain['author']
  time_to_finish_reading?: Article_Plain['time_to_finish_reading']
}
