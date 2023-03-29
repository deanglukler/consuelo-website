import Container from 'components/shared/Container'
import SiteHeader from 'components/shared/SiteHeader'
import Layout from 'components/shared/Layout'
import IndexPageHead from 'components/pages/homepage/IndexPageHead'
import * as demo from 'lib/demo.data'
import { PageCategory, Settings } from '../../../types'
import { Footer } from '../../shared/Footer'
import Image from 'next/image'
import { urlForImage } from '../../../lib/sanity.image'

export interface ContactPageProps {
  preview?: boolean
  loading?: boolean
  settings?: Settings
  pageCategories?: PageCategory[]
}

export default function ContactPage(props: ContactPageProps) {
  const { preview, loading, settings, pageCategories } = props
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
