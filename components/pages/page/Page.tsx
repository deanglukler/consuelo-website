import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import { PagePayload, SettingsPayload, PageCategory } from 'types'
import Container from '../../Container'
import Layout from '../../Layout'
import SiteHeader from '../../SiteHeader'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
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
  const { body, overview, title } = page || {}

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout preview={preview}>
        <Container>
          <div>
            <div className="mb-14">
              {/* Header */}
              <SiteHeader
                title={title}
                pageCategories={pageCategories}
                level={1}
              />

              {/* Body */}
              {body && (
                <CustomPortableText
                  paragraphClasses="max-w-3xl text-gray-600 text-xl leading-8 pb-2"
                  value={body}
                />
              )}

              {/* Workaround: scroll to top on route change */}
              <ScrollUp />
            </div>
            <div className="absolute left-0 w-screen border-t" />
          </div>
        </Container>
      </Layout>
    </>
  )
}
