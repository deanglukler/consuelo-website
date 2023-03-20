import { GetServerSideProps } from 'next'
import {
  getHomePageTitle,
  getPageCategoryBySlug,
  getPagesByPageCategorySlug,
  getSettings,
  getPageCategories,
} from 'lib/sanity.client'
import { PageCategory, PagePayload, Settings } from 'types'
import SiteHeader from 'components/SiteHeader'
import ScrollUp from 'components/shared/ScrollUp'
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import Link from 'next/link'
import { PAGE_PATH } from '../../lib/sanity.links'

interface PageProps {
  pages: PagePayload[]
  settings?: Settings
  homePageTitle?: string
  preview: boolean
  token: string | null
  pageCategory: PageCategory
  pageCategories: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function CategoryPage(props: PageProps) {
  const { preview, settings, pageCategories, pageCategory, pages } = props
  const { title = '' } = settings || {}
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <SiteHeader title={title} pageCategories={pageCategories} level={1} />
          <div className="mb-14">
            <h1>{pageCategory.categoryName}</h1>

            <div>
              {pages.map(({ title, slug }) => {
                return (
                  <Link key={slug} href={PAGE_PATH(pageCategory.slug, slug)}>
                    <h3>{title}</h3>
                  </Link>
                )
              })}
            </div>

            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, pageCategories, pageCategory, pages, homePageTitle] =
    await Promise.all([
      getSettings(),
      getPageCategories(),
      getPageCategoryBySlug({ slug: params.category }),
      getPagesByPageCategorySlug({ slug: params.category }),
      getHomePageTitle({ token }),
    ])

  if (!pageCategory) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageCategories,
      pageCategory,
      pages,
      settings,
      homePageTitle,
      preview,
      token: previewData.token ?? null,
    },
  }
}
