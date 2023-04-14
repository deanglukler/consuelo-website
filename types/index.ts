import type { Image, PortableTextBlock } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
  coverImage?: any
  coverImagePosition?: string
  gallery?: Gallery
  pageCategory?: PageCategory
}

export interface Settings {
  title?: string
  siteLogo?: Image
  profileImage: Image
  contactPageBody: any[]
  description?: string
  openGraphImage: Image
}

export type Gallery = {
  title?: string
  images: Image[] | null
}

export interface PageCategory {
  _id: string
  categoryName: string
  slug: string
  menuPosition: number
}
