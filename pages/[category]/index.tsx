import { GetServerSideProps } from 'next'
import {
  getPageCategoryBySlug,
  getPagesByPageCategorySlug,
} from 'lib/sanity.client'
import { PageCategory, PagePayload, Settings } from 'types'
import SiteHeader from 'components/shared/SiteHeader'
import ScrollUp from 'components/shared/ScrollUp'
import Layout from '../../components/shared/Layout'
import Container from '../../components/shared/Container'
import Link from 'next/link'
import { PAGE_PATH } from '../../lib/sanity.links'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Footer } from '../../components/shared/Footer'
import { getCommonPageProps } from '../../lib/getCommonPageProps'
import { smallImageUrl } from '../../lib/utils'
import IndexPageHead from 'components/pages/homepage/IndexPageHead'

interface PageProps {
  pages?: PagePayload[]
  settings?: Settings
  preview: boolean
  token: string | null
  pageCategory?: PageCategory
  pageCategories?: PageCategory[]
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

  function renderPages() {
    if (!pages) return null
    return (
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: `repeat(auto-fit, minmax(min(20rem, 100%), 1fr))`,
        }}
      >
        {pages.map(
          ({
            title = 'NO TITLE',
            slug,
            overview,
            coverImage,
            coverImagePosition = 'center',
          }) => {
            return (
              <Link key={slug} href={PAGE_PATH(pageCategory?.slug, slug)}>
                <div
                  style={{
                    paddingTop: '56.25%', // padding hack 16:9 ratio
                    position: 'relative',
                  }}
                  className="page-preview-hover"
                >
                  <Image
                    src={smallImageUrl(coverImage)}
                    alt={title}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: coverImagePosition,
                    }}
                  />
                </div>
                <h3 className="my-2 text-xl font-regular sm:text-3xl">
                  {title}
                </h3>
                {overview && (
                  <div className="text-sm text-gray-600">
                    <PortableText value={overview} />
                  </div>
                )}
              </Link>
            )
          }
        )}
      </div>
    )
  }

  return (
    <>
      <IndexPageHead settings={settings} title={pageCategory?.categoryName} />
      <Layout preview={preview}>
        <Container>
          <SiteHeader
            title={siteTitle}
            pageCategories={pageCategories}
            currentCategory={pageCategory}
            level={1}
          />
          <div className="mb-14">
            {renderPages()}

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

  const { settings, pageCategories } = await getCommonPageProps(ctx)
  const [pageCategory, pages] = await Promise.all([
    getPageCategoryBySlug({ slug: params.category }),
    getPagesByPageCategorySlug({ slug: params.category }),
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
      preview,
      token: previewData.token ?? null,
    },
  }
}
