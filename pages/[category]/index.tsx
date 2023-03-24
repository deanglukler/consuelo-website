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
import Image from 'next/image'
import { urlForImage } from '../../lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { Footer } from '../../components/global/Footer'

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
  const { title: siteTitle = '' } = settings || {}
  return (
    <>
      <Layout preview={preview}>
        <Container>
          <SiteHeader
            title={siteTitle}
            pageCategories={pageCategories}
            currentCategory={pageCategory}
            level={1}
          />
          <div className="mb-14">
            <div
              style={{
                display: 'grid',
                gap: '2rem',
                gridTemplateColumns: `repeat(auto-fit, minmax(min(20rem, 100%), 1fr))`,
              }}
            >
              {pages.map(({ title, slug, overview, coverImage }) => {
                return (
                  <Link key={slug} href={PAGE_PATH(pageCategory.slug, slug)}>
                    <div
                      style={{
                        paddingTop: '56.25%', // padding hack 16:9 ratio
                        position: 'relative',
                      }}
                      className="page-preview-hover"
                    >
                      <Image
                        src={urlForImage(coverImage).url()}
                        alt={title}
                        fill
                        style={{
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                    <h3 className="my-2 text-xl font-medium sm:text-3xl">
                      {title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      <PortableText value={overview} />
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
        </Container>
      </Layout>
      <Footer />
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
