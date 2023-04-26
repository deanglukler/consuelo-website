import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockTextDecorators } from './studio-utils/blockTextDecorators'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description:
        'This is part of the link to the page.  Warning, changing this will make your shared links on social media invalid.',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description:
        'This image will be used as a preview for portfolio pages and blog pages.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImagePosition',
      title: 'Cover Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'pageCategory',
      title: 'Page Category',
      to: [
        {
          type: 'pageCategory',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      type: 'reference',
      name: 'gallery',
      title: 'Gallery',
      description:
        'Use a gallery as the main content of the page.  Note that if a gallery is selected the Cover Image will not be displayed on the page.',
      to: [{ type: 'gallery' }],
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      description: "This is where you can write the page's content.",
      of: [
        // Paragraphs
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: blockTextDecorators,
          },
          styles: [
            { title: 'Heading', value: 'h2' },
            { title: 'Sub Heading', value: 'h3' },
          ],
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },

          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineField({
          type: 'reference',
          name: 'gallery',
          title: 'Gallery',
          to: [{ type: 'gallery' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: `Page`,
      }
    },
  },
})
