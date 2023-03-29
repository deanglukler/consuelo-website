import { PreviewSuspense } from '@sanity/preview-kit'
import { Page } from 'components/pages/page/Page'
import { getPageBySlug } from 'lib/sanity.client'
import { GetServerSideProps } from 'next'
import { lazy } from 'react'
import { PagePayload, Settings, PageCategory } from 'types'
import { PreviewWrapper } from '../../components/preview/PreviewWrapper'
import { getCommonPageProps } from '../../lib/getCommonPageProps'

const PagePreview = lazy(() => import('components/pages/page/PagePreview'))

interface PageProps {
  page?: PagePayload
  settings?: Settings
  preview: boolean
  token: string | null
  pageCategories?: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, page, preview, token, pageCategories } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PreviewWrapper>
            <Page
              pageCategories={pageCategories}
              page={page}
              settings={settings}
              preview={preview}
            />
          </PreviewWrapper>
        }
      >
        <PagePreview
          token={token}
          page={page}
          settings={settings}
          pageCategories={pageCategories}
        />
      </PreviewSuspense>
    )
  }

  return (
    <Page
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

  const { settings, pageCategories } = await getCommonPageProps(ctx)

  const [page] = await Promise.all([
    getPageBySlug({ token, slug: params.page }),
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
      preview,
      token: previewData.token ?? null,
    },
  }
}
