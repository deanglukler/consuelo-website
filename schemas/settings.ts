import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockTextDecorators } from './studio-utils/blockTextDecorators'

export default defineType({
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
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
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
      description:
        'Logo will appear in the Header of the site instead of the Title',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Photo used on Contact page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      type: 'string',
      description: 'Name displayed underneath the profile image',
    }),
    defineField({
      name: 'contactPageBody',
      title: 'Contact Page Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Heading', value: 'h2' },
            { title: 'Sub Heading', value: 'h3' },
          ],
          marks: {
            decorators: blockTextDecorators,
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
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
