import { PreviewSuspense } from '@sanity/preview-kit'
import IndexPage from 'components/IndexPage'
import {
  getAllPosts,
  getHomeGallery,
  getPageCategories,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import { Gallery, PageCategory, Post, Settings } from '../types'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

interface PageProps {
  posts: Post[]
  settings: Settings
  preview: boolean
  token: string | null
  homeGallery: Gallery
  pageCategories: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Page(props: PageProps) {
  const { posts, settings, preview, token, homeGallery, pageCategories } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage
            loading
            preview
            posts={posts}
            settings={settings}
            homeGallery={homeGallery}
            pageCategories={pageCategories}
          />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return (
    <IndexPage
      posts={posts}
      settings={settings}
      homeGallery={homeGallery}
      pageCategories={pageCategories}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const [settings, posts = [], homeGallery, pageCategories] = await Promise.all(
    [getSettings(), getAllPosts(), getHomeGallery(), getPageCategories()]
  )

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
      homeGallery,
      pageCategories,
    },
  }
}
