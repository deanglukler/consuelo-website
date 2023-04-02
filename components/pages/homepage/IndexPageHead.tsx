import * as demo from 'lib/demo.data'
import { Settings } from '../../../types'
import { SiteMeta } from '../../shared/SiteMeta'

export interface IndexPageHeadProps {
  settings?: Settings
  title?: string
}

export default function IndexPageHead({ settings, title }: IndexPageHeadProps) {
  const {
    title: baseTitle = demo.title,
    description = 'Website',
    openGraphImage,
  } = settings || {}

  return (
    <SiteMeta
      description={description}
      image={openGraphImage}
      baseTitle={baseTitle}
      title={title}
    />
  )
}
