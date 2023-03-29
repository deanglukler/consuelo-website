import { GetStaticProps } from 'next'
import ContactPage from '../../components/pages/contact/ContactPage'
import { getCommonPageProps } from '../../lib/getCommonPageProps'
import { PageCategory, Settings } from '../../types'

interface PageProps {
  settings?: Settings
  preview: boolean
  token: string | null
  pageCategories?: PageCategory[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Page(props: PageProps) {
  const { settings, pageCategories } = props

  return <ContactPage settings={settings} pageCategories={pageCategories} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const { settings, pageCategories } = await getCommonPageProps(ctx)

  return {
    props: {
      settings,
      preview,
      token: previewData.token ?? null,
      pageCategories,
    },
  }
}
