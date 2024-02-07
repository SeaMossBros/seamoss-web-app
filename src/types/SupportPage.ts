import { Media } from './Media'

export interface SupportPage {
    id: number
    attributes: {
        createdAt: string
        updatedAt: string
        publishedAt?: string
        hero_images: { data: Media[] }
    }
}

export interface SupportPage_Plain {
    id: number
    createdAt: string
    updatedAt: string
    publishedAt?: string
    hero_images: Media[]
}

export interface SupportPage_NoRelations {
    id: number
    createdAt: string
    updatedAt: string
    publishedAt?: string
    hero_images: number[]
}
