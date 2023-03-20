import { PreviewSuspense } from '@sanity/preview-kit'
import { Page } from 'components/pages/page/Page'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import {
  getHomePageTitle,
  getPageBySlug,
  getPagePaths,
  getSettings,
  getPageCategories,
} from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import { GetServerSideProps, GetStaticProps } from 'next'
import { lazy } from 'react'
import { PagePayload, Settings, PageCategory } from 'types'

const PagePreview = lazy(() => import('components/pages/page/PagePreview'))

interface PageProps {
  page?: PagePayload
  settings?: Settings
  homePageTitle?: string
  preview: boolean
  token: string | null
  pageCategories: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { homePageTitle, settings, page, preview, token, pageCategories } =
    props

  // if (preview) {
  //   return (
  //     <PreviewSuspense
  //       fallback={
  //         <PreviewWrapper>
  //           <Page
  //             homePageTitle={homePageTitle}
  //             page={page}
  //             settings={settings}
  //             preview={preview}
  //           />
  //         </PreviewWrapper>
  //       }
  //     >
  //       <PagePreview
  //         token={token}
  //         page={page}
  //         settings={settings}
  //         homePageTitle={homePageTitle}
  //       />
  //     </PreviewSuspense>
  //   )
  // }

  return (
    <Page
      homePageTitle={homePageTitle}
      page={page}
      settings={settings}
      preview={preview}
      pageCategories={pageCategories}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, pageCategories, page, homePageTitle] = await Promise.all([
    getSettings(),
    getPageCategories(),
    getPageBySlug({ token, slug: params.page }),
    getHomePageTitle({ token }),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
      pageCategories,
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
  }
}
