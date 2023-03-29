import {
  getHomeGallery,
  getPageCategories,
  getSettings,
} from 'lib/sanity.client'

export interface Query {
  [key: string]: string
}

export interface PreviewData {
  token?: string
}

export const getCommonPageProps = async (ctx: {
  preview?: boolean
  previewData?: any
}) => {
  const { previewData = {} } = ctx
  const token = previewData.token
  const [settings, homeGallery, pageCategories] = await Promise.all([
    getSettings({ token }),
    getHomeGallery({ token }),
    getPageCategories({ token }),
  ])

  return {
    settings,
    homeGallery,
    pageCategories,
  }
}
