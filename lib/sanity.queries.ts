import { groq } from 'next-sanity'

const galleryFields = groq`
  ..., 
  images[]{
    ..., 
    asset->
  }
`

const pageFields = groq`
  ...,
  body[]{
    ...,
    _type == "gallery" => {
      "galleryData": *[_type == "gallery" && _id == ^._ref][0]{
        ${galleryFields}
      }
    }
    
  },
  "slug": slug.current,
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

export const settingsQuery = groq`*[_type == "settings"][0]{
  ...,
  profileImage{
    ...,
    asset->
  },
  openGraphImage{
    ...,
    asset->
  }
}`

export const pageCategoriesQuery = groq`*[_type == 'pageCategory'] [] {
  ${pageCategoryFields} 
}`

export const homeGalleryQuery = groq`
*[_type == "gallery" && title == "Home Gallery"] [0] {
  ${galleryFields}
}
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
