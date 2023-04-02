import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Photo used on Contact page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used the <meta> description tag for SEO',
      title: 'Description',
      type: 'string',
      initialValue: 'Enter meta data description for SEO',
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the home page.',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
