import Container from 'components/Container'
import SiteHeader from 'components/SiteHeader'
import Layout from 'components/Layout'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import { Gallery, PageCategory, Post, Settings } from '../types'
import HomeGallery from './homepage/HomeGallery'
import { Footer } from './global/Footer'
import Image from 'next/image'
import { urlForImage } from '../lib/sanity.image'

export interface ContactPageProps {
  preview?: boolean
  loading?: boolean
  homeGallery: Gallery
  posts: Post[]
  settings: Settings
  pageCategories: PageCategory[]
}

export default function ContactPage(props: ContactPageProps) {
  const { preview, loading, settings, homeGallery, pageCategories } = props
  const { title = demo.title, profileImage } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <SiteHeader title={title} pageCategories={pageCategories} level={1} />
          <div className="relative h-[200px] w-[200px]">
            <Image
              src={urlForImage(profileImage).url()}
              fill
              alt="photographers profile image"
            />
          </div>
        </Container>
      </Layout>
      <Footer />
    </>
  )
}
