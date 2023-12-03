import { Media } from './Media'

export interface HomePage {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    hero_images: { data: Media[] }
  }
}
export interface HomePage_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  hero_images: Media[]
}

export interface HomePage_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  hero_images: number[]
}
