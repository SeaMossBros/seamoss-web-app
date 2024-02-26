import { UserType } from "./User"

export interface SupportMessage {
    id: number
    attributes: {
        body: string
        subject: string
        name: string
        email: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        // createdBy: { data: UserType }
        // updatedBy: { data: UserType }
    }
}

export interface SupportMessage_Plain {
    // id: number
    // createdAt: string
    // updatedAt: string
    body: string
    subject: string
    name: string
    email: string
}
