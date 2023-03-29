import IndexPage from 'components/pages/homepage/IndexPage'
import { GetServerSideProps } from 'next'
import { getCommonPageProps } from '../lib/getCommonPageProps'
import { Gallery, PageCategory, Settings } from '../types'

interface PageProps {
  settings?: Settings
  preview: boolean
  token: string | null
  homeGallery: Gallery | undefined
  pageCategories?: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Page(props: PageProps) {
  const { settings, preview, homeGallery, pageCategories } = props

  return (
    <IndexPage
      preview={preview}
      settings={settings}
      homeGallery={homeGallery}
      pageCategories={pageCategories}
    />
  )
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const { settings, homeGallery, pageCategories } = await getCommonPageProps(
    ctx
  )

  return {
    props: {
      settings,
      preview,
      token: previewData.token ?? null,
      homeGallery,
      pageCategories,
    },
  }
}
