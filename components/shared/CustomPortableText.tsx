import { PortableText, PortableTextComponents } from '@portabletext/react'
import ImageBox from 'components/shared/ImageBox'
import { Image, PortableTextBlock } from 'sanity'
import { Gallery } from '../../types'
import MasonryGallery from './MasonryGallery'
import customPortaleTaxtStyles from './CustomPortableText.module.css'

export function CustomPortableText({
  paragraphClasses,
  value,
  divStyle,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
  divStyle?: string
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
      justify: ({ children }) => {
        return (
          <span
            style={{
              display: 'block',
              textAlign: 'justify',
              textJustify: 'inter-word',
            }}
          >
            {children}
          </span>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      gallery: ({ value }: { value: { galleryData: Gallery } }) => {
        return <MasonryGallery images={value.galleryData.images || []} />
      },
    },
  }

  return (
    <>
      <style>
        {`.customPortableTextStyles {
        ${divStyle}
      }`}
      </style>
      <div
        className={`${customPortaleTaxtStyles.portableText} customPortableTextStyles`}
      >
        <PortableText components={components} value={value} />
      </div>
    </>
  )
}
