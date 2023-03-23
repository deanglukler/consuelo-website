import cN from 'classnames'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Image from 'next/image'
import { PagePayload, PageCategory, Settings } from 'types'
import { urlForImage } from '../../../lib/sanity.image'
import Container from '../../Container'
import HomeGallery from '../../homepage/HomeGallery'
import Layout from '../../Layout'
import SiteHeader from '../../SiteHeader'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload | undefined
  settings: Settings | undefined
  homePageTitle: string | undefined
  preview?: boolean
  pageCategories: PageCategory[]
}

export function Page({
  page,
  settings,
  homePageTitle,
  preview,
  pageCategories,
}: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, body, overview, coverImage, gallery, pageCategory } =
    page || {}
  const { title: siteTitle = '' } = settings || {}

  const galleryImages = gallery?.images

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout preview={preview}>
        <Container>
          {/* Header */}
          <SiteHeader
            title={siteTitle}
            pageCategories={pageCategories}
            currentCategory={pageCategory}
            level={1}
          />
        </Container>

        {!galleryImages && (
          <div className="relative w-full pt-[60%] sm:pt-[40%]">
            <Image
              src={urlForImage(coverImage).url()}
              alt={`Preview image for ${title} page`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <Container>
          <h1
            className={cN('mt-12', 'text-3xl', 'sm:mt-12', 'font-bold', {
              ['text-center']: galleryImages,
            })}
          >
            {title}
          </h1>
          {gallery && <HomeGallery images={gallery.images || []} />}

          {/* Body */}
          {body && <CustomPortableText value={body} />}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
          <div className="absolute left-0 w-screen border-t" />
        </Container>
      </Layout>
    </>
  )
}
