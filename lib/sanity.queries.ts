import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`
const galleryFields = groq`
  ..., 
  images[]{
    ..., 
    asset->
  }
`

const pageFields = groq`
  _id,
  body,
  overview,
  title,
  "slug": slug.current,
  coverImage,
  gallery->{
    ${galleryFields}
  },
  pageCategory->
`
const pageCategoryFields = groq`
  _id,
  categoryName,
  "slug": slug.current,
  menuPosition
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const pageCategoriesQuery = groq`*[_type == 'pageCategory'] [] {
  ${pageCategoryFields} 
}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const homeGalleryQuery = groq`
*[_type == "gallery" && title == "Home Gallery"] [0] {
  ${galleryFields}
}
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ${pageFields}
  }
`

export const pageCategoryBySlugQuery = groq`
  *[_type == 'pageCategory' && slug.current == $slug][0] {
    ${pageCategoryFields}
  }
`

export const pagesByPageCategorySlugQuery = groq`
  *[_type == 'page' && references(*[_type == 'pageCategory' && slug.current == $slug][0]._id)] [] {
    ${pageFields}
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`
