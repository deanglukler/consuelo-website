import Masonry from 'react-masonry-component'
import { useEffect, useRef, useState } from 'react'
import { Image as SanityImage, ImageAsset } from 'sanity'
import { useIntersectionObserverTransition } from './hooks'
import Image from 'next/image'
import {
  FullPageGalleryView,
  useFullPageGalleryView,
} from './FullPageGalleryView'
import { largeImageUrl, smallImageUrl } from '../../lib/utils'

interface Props {
  images: SanityImage[]
}

const MD_BREAKPOINT = 350
const LG_BREAKPOINT = 700
const GUTTER_LG = 10
const GUTTER_MD = 8

export default function MasonryGallery({ images }: Props) {
  const ref = useRef<null | HTMLDivElement>(null)
  const [boundingBoxWidth, setBoundingBoxWidth] = useState<number>(0)
  const fullPageGalleryViewProps = useFullPageGalleryView({
    images: images.map((s) => largeImageUrl(s)), // keep in mind this must martch the url in the onClick function of the photo
  })

  useIntersectionObserverTransition()

  useEffect(() => {
    // Get the bounding box width on mount and on screen resize
    function updateBoundingBoxWidth() {
      if (ref.current) {
        const { width } = ref.current.getBoundingClientRect()
        setBoundingBoxWidth(width)
      }
    }
    updateBoundingBoxWidth()
    window.addEventListener('resize', updateBoundingBoxWidth)

    return () => {
      window.removeEventListener('resize', updateBoundingBoxWidth)
    }
  }, [])

  if (images.length === 0) {
    return null
  }

  let { gutterSizeX, imageWidth, gutterSizeY, columns } =
    imageDimensions(boundingBoxWidth)

  // adjust image width to take up the space of one gutter width between them
  imageWidth = imageWidth + gutterSizeX / columns

  return (
    <div
      ref={ref}
      style={{
        width: `calc(100% + ${gutterSizeX}px)`,
        marginLeft: `-${gutterSizeX}px`,
      }}
    >
      {/* @ts-ignore */}
      <Masonry>
        {images.map((source) => {
          // this seems to come back as null sometimes
          const imageAsset = source.asset as unknown as ImageAsset | null
          if (!imageAsset) {
            return console.warn(
              'Cant render a image as source.asset is undefined'
            )
          }
          const { width, height } = imageAsset?.metadata?.dimensions
          const scaleFactor = imageWidth / width
          return (
            <div
              key={imageAsset._id}
              className={`hiddenAnim`}
              onClick={() =>
                fullPageGalleryViewProps.setCurrentImageSource(
                  largeImageUrl(source) // must match the url in given to full page gallery view
                )
              }
              style={{
                marginLeft: gutterSizeX,
                marginBottom: gutterSizeY,
                width: imageWidth,
                height: height * scaleFactor,
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              <Image
                src={smallImageUrl(source)}
                alt={'Beautiful Photo'}
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          )
        })}
      </Masonry>
      <FullPageGalleryView {...fullPageGalleryViewProps} />
    </div>
  )
}

function imageDimensions(boundingBoxWidth: number) {
  let columns = 1
  let imageWidth = 0
  let gutterSizeX = 0
  let gutterSizeY = 0
  if (boundingBoxWidth > LG_BREAKPOINT) {
    columns = 3
    gutterSizeX = GUTTER_LG
    gutterSizeY = GUTTER_LG
    imageWidth = boundingBoxWidth / columns - GUTTER_LG
  } else if (boundingBoxWidth > MD_BREAKPOINT) {
    columns = 2
    gutterSizeX = GUTTER_MD
    gutterSizeY = GUTTER_MD
    imageWidth = boundingBoxWidth / columns - GUTTER_MD
  } else {
    imageWidth = boundingBoxWidth
    gutterSizeY = GUTTER_MD
  }
  return { gutterSizeX, imageWidth, gutterSizeY, columns }
}
