import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  indexQuery,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  settingsQuery,
  homeGalleryQuery,
  homePageQuery,
  homePageTitleQuery,
  pagesBySlugQuery,
  projectBySlugQuery,
  projectPaths,
  pagePaths,
  pageCategoriesQuery,
  pagesByPageCategorySlugQuery,
  pageCategoryBySlugQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type {
  Gallery,
  HomePagePayload,
  PageCategory,
  PagePayload,
  Post,
  ProjectPayload,
  Settings,
} from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

export async function getPageCategories(): Promise<PageCategory[]> {
  if (client) {
    return (await client.fetch(pageCategoriesQuery)) || []
  }
  return []
}

export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(indexQuery)) || []
  }
  return []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch(postAndMoreStoriesQuery, { slug })
  }
  return { post: null, morePosts: [] }
}

export async function getHomeGallery(): Promise<Gallery> {
  if (client) {
    return (await client.fetch(homeGalleryQuery)) || { images: [] }
  }
  return { images: [] }
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}

export async function getHomePageTitle({
  token,
}: {
  token?: string
}): Promise<string | undefined> {
  return await sanityClient(token)?.fetch(homePageTitleQuery)
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
}: {
  slug: string
  token?: string
}): Promise<PageCategory | undefined> {
  if (client) {
    return (await client.fetch(pageCategoryBySlugQuery, { slug })) || undefined
  }
  return undefined
}

export async function getPagesByPageCategorySlug({
  slug,
}: {
  slug: string
  token?: string
}): Promise<PagePayload[]> {
  if (client) {
    return (
      (await client.fetch(pagesByPageCategorySlugQuery, {
        slug,
      })) || []
    )
  }
  return []
}

export async function getProjectBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<ProjectPayload | undefined> {
  return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
}

export async function getProjectPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(projectPaths)
}

export async function getPagePaths(): Promise<string[]> {
  return await sanityClient()?.fetch(pagePaths)
}
