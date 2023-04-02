import Container from 'components/shared/Container'
import SiteHeader from 'components/shared/SiteHeader'
import Layout from 'components/shared/Layout'
import IndexPageHead from 'components/pages/homepage/IndexPageHead'
import * as demo from 'lib/demo.data'
import { PageCategory, Settings } from '../../../types'
import { Footer } from '../../shared/Footer'
import Image from 'next/image'
import { smallImageUrl } from '../../../lib/utils'
import { CustomPortableText } from '../../shared/CustomPortableText'

export interface ContactPageProps {
  preview?: boolean
  loading?: boolean
  settings?: Settings
  pageCategories?: PageCategory[]
}

export default function ContactPage(props: ContactPageProps) {
  const { preview, loading, settings, pageCategories } = props
  const {
    title = demo.title,
    profileImage,
    contactPageBody = [],
  } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} title="Contact" />

      <Layout preview={preview} loading={loading}>
        <Container>
          <SiteHeader title={title} pageCategories={pageCategories} level={1} />
          <div className="flex flex-col items-center max-w-md m-auto">
            <div className="w-min rounded-full border-[1px] border-solid border-gray-300 p-[1px]">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
                <Image
                  src={smallImageUrl(profileImage)}
                  fill
                  alt="photographers profile image"
                />
              </div>
            </div>
            <CustomPortableText value={contactPageBody} />
          </div>
        </Container>
      </Layout>
      <Footer />
    </>
  )
}
