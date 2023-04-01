import cN from 'classnames'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Image from 'next/image'
import { PagePayload, PageCategory, Settings } from 'types'
import Container from '../../shared/Container'
import { Footer } from '../../shared/Footer'
import MasonryGallery from '../../shared/MasonryGallery'
import Layout from '../../shared/Layout'
import SiteHeader from '../../shared/SiteHeader'

import PageHead from './PageHead'
import { largeImageUrl } from '../../../lib/utils'

export interface PageProps {
  page: PagePayload | undefined
  settings: Settings | undefined
  preview?: boolean
  pageCategories?: PageCategory[]
}

export function Page({ page, settings, preview, pageCategories }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, body, coverImage, gallery, pageCategory } = page || {}
  const { title: siteTitle = '' } = settings || {}

  const galleryImages = gallery?.images

  return (
    <>
      <PageHead page={page} settings={settings} title={title} />

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
              src={largeImageUrl(coverImage)}
              alt={`Preview image for ${title} page`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <Container>
          <h1
            className={cN('mt-12', 'text-3xl', 'sm:mt-12', 'font-regular', {
              ['mb-12 text-center']: galleryImages,
            })}
          >
            {title}
          </h1>
          {galleryImages && <MasonryGallery images={galleryImages || []} />}

          {/* Body */}
          {body && <CustomPortableText value={body} />}

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </Container>
      </Layout>
      <Footer />
    </>
  )
}
