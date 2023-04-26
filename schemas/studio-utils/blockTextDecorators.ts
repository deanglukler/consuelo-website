import { ReactNode } from 'react'
import JustifyPreview from './JustifyPreview'

export const blockTextDecorators = [
  {
    title: 'Justify',
    value: 'justify',
    icon: (() => 'Jsfy') as unknown as ReactNode,
    component: JustifyPreview,
  },
  { title: 'Strong', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Underline', value: 'underline' },
  { title: 'Strike', value: 'strike-through' },
]
