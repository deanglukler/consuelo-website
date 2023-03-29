// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DefaultDocumentNodeResolver } from 'sanity/desk'
import pageType from '../../schemas/page'

import PostPreviewPane from './PostPreviewPane'
import { getPageCategories } from 'lib/sanity.client'
import { PageCategory } from '../../types'
import { PAGE_PATH } from '../../lib/sanity.links'

let categories: null | PageCategory[] = null
getPageCategories({})
  .then((c) => (categories = c))
  .catch(console.error)

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string
  previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case pageType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => {
              if (document.displayed.pageCategory) {
                const categoryRef = document.displayed.pageCategory._ref
                const matchingCategory = categories?.find(
                  (category) => category._id === categoryRef
                )

                if (matchingCategory) {
                  return (
                    <PostPreviewPane
                      slug={PAGE_PATH(
                        matchingCategory.slug,
                        document.displayed.slug?.current
                      )}
                      apiVersion={apiVersion}
                      previewSecretId={previewSecretId}
                    />
                  )
                } else {
                  console.log('No matching category found')
                  return null
                }
              } else {
                console.log('Document has no pageCategory property')
                return null
              }
            })
            .title('Preview'),
        ])

      default:
        return null
    }
  }
}
