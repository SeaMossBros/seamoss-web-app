import { Media } from './Media'

export interface Author {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    name: string
    avatar: { data: Media }
  }
}
export interface Author_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  avatar: Media
}

export interface Author_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  avatar: number
}
