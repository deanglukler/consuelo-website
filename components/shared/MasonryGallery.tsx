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

  let { marginLeft, setWidth, marginBottom } = imageDimensions(boundingBoxWidth)

  return (
    <div ref={ref} style={{ marginLeft: `-${marginLeft}px` }}>
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
          const scaleFactor = setWidth / width
          return (
            <div
              key={imageAsset._id}
              style={{
                width: setWidth,
                height: height * scaleFactor,
                marginLeft,
                marginBottom,
                boxSizing: 'border-box',
              }}
              className={`hiddenAnim`}
              onClick={() =>
                fullPageGalleryViewProps.setCurrentImageSource(
                  largeImageUrl(source) // must match the url in given to full page gallery view
                )
              }
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
  let setWidth = 0
  let marginLeft = 0
  let marginBottom = GUTTER_MD
  if (boundingBoxWidth > LG_BREAKPOINT) {
    marginLeft = GUTTER_LG
    marginBottom = GUTTER_LG
    setWidth = boundingBoxWidth / 3 - GUTTER_LG
  } else if (boundingBoxWidth > MD_BREAKPOINT) {
    marginLeft = GUTTER_MD
    setWidth = boundingBoxWidth / 2 - GUTTER_MD
  } else {
    setWidth = boundingBoxWidth
  }
  return { marginLeft, setWidth, marginBottom }
}
