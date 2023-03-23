import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'pageCategory',
  title: 'Page Category',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Names',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'categoryName',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'number',
      name: 'menuPosition',
      title: 'Position in Menu',
      description:
        'Position in menu from start (lowest number) to end (highest number)',
      validation: (rule) => rule.required(),
    }),
  ],
})
