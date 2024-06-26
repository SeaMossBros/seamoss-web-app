import { Author, Author_Plain } from './Author'
import { Media } from './Media'

export interface Article {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    title: string
    introduction?: string
    content: string
    slug?: string
    cover: { data: Media }
    author?: { data: Author }
    time_to_finish_reading: number
  }
}
export interface Article_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title: string
  introduction?: string
  content: string
  slug?: string
  cover: Media
  author?: Author_Plain
  time_to_finish_reading: number
}

export interface Article_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title: string
  introduction?: string
  content: string
  slug?: string
  cover: number
  author?: number
  time_to_finish_reading: number
}
