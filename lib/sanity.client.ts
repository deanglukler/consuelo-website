import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  settingsQuery,
  homeGalleryQuery,
  pagesBySlugQuery,
  pageCategoriesQuery,
  pagesByPageCategorySlugQuery,
  pageCategoryBySlugQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type { Gallery, PageCategory, PagePayload, Settings } from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

export async function getSettings({
  token,
}: {
  token?: string
}): Promise<Settings | undefined> {
  return await sanityClient(token)?.fetch(settingsQuery)
}

export async function getPageCategories({
  token,
}: {
  token?: string
}): Promise<PageCategory[] | undefined> {
  return await sanityClient(token)?.fetch(pageCategoriesQuery)
}

export async function getHomeGallery({
  token,
}: {
  token?: string
}): Promise<Gallery | undefined> {
  return await sanityClient(token)?.fetch(homeGalleryQuery)
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, { slug })
}

export async function getPageCategoryBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PageCategory | undefined> {
  return await sanityClient(token)?.fetch(pageCategoryBySlugQuery, { slug })
}

export async function getPagesByPageCategorySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PagePayload[] | undefined> {
  return await sanityClient(token)?.fetch(pagesByPageCategorySlugQuery, {
    slug,
  })
}
