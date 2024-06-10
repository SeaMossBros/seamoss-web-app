import { Media } from './Media'

export interface AboutUsPage {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    hero_images: { data: Media[] }
  }
}
export interface AboutUsPage_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  hero_images: Media[]
}

export interface AboutUsPage_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  hero_images: number[]
}
