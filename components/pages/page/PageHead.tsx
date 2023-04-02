import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/shared/SiteMeta'
import { PagePayload, Settings } from 'types'

export interface PageHeadProps {
  siteTitle: string | undefined
  page: PagePayload | undefined
  settings: Settings | undefined
}

export default function PageHead({ siteTitle, page, settings }: PageHeadProps) {
  return (
    <SiteMeta
      baseTitle={siteTitle}
      description={page?.overview ? toPlainText(page.overview) : ''}
      image={page?.coverImage}
      title={page?.title}
    />
  )
}
