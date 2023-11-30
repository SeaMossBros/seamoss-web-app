import { JSONContent } from '@tiptap/react'

import { Media } from './Media'

export interface Article {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    title: string
    introduction?: string
    content: JSONContent
    slug?: string
    cover_image: { data: Media }
  }
}
export interface Article_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title: string
  introduction?: string
  content: JSONContent
  slug?: string
  cover_image: Media
}

export interface Article_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  title: string
  introduction?: string
  content: JSONContent
  slug?: string
  cover_image: number
}
