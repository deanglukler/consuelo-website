import Container from 'components/shared/Container'
import SiteHeader from 'components/shared/SiteHeader'
import Layout from 'components/shared/Layout'
import IndexPageHead from 'components/pages/homepage/IndexPageHead'
import * as demo from 'lib/demo.data'
import { Gallery, PageCategory, Settings } from '../../../types'
import MasonryGallery from '../../shared/MasonryGallery'
import { Footer } from '../../shared/Footer'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  homeGallery: Gallery | undefined
  settings?: Settings
  pageCategories?: PageCategory[]
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, settings, homeGallery, pageCategories } = props
  const { title = demo.title } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={Boolean(preview)} loading={loading}>
        <Container>
          <SiteHeader title={title} pageCategories={pageCategories} level={1} />
          <MasonryGallery images={homeGallery?.images || []} />
        </Container>
      </Layout>
      <Footer />
    </>
  )
}
