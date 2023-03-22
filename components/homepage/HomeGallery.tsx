import { urlForImage } from 'lib/sanity.image'
import Masonry from 'react-masonry-component'
import { useEffect, useRef, useState } from 'react'
import GalleryImage from './GalleryImage'
import { Image, ImageAsset } from 'sanity'

interface Props {
  images: Image[]
}

const MD_BREAKPOINT = 350
const LG_BREAKPOINT = 700
const GUTTER_LG = 20
const GUTTER_MD = 10

export default function HomeGallery({ images }: Props) {
  const ref = useRef<null | HTMLDivElement>(null)
  const [boundingBoxWidth, setBoundingBoxWidth] = useState<null | number>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showAnim')
        } else {
          entry.target.classList.remove('showAnim')
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.hiddenAnim')
    hiddenElements.forEach((el) => observer.observe(el))

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

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

  return (
    <div ref={ref}>
      {/* @ts-ignore */}
      <Masonry>
        {images.map((source) => {
          // this seems to come back as null sometimes
          const imageAsset = source.asset as unknown as ImageAsset | null
          if (!imageAsset) {
            return null
          }
          const { width, height } = imageAsset?.metadata?.dimensions
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
          const scaleFactor = setWidth / width
          return (
            <GalleryImage
              key={source.asset._id}
              alt={`Beautiful Photo`}
              src={urlForImage(source).url()}
              thumbnailClassName={`hiddenAnim`}
              thumbnailStyle={{
                width: setWidth,
                height: height * scaleFactor,
                marginLeft,
                marginBottom,
                boxSizing: 'border-box',
              }}
            />
          )
        })}
      </Masonry>
    </div>
  )
}

const image_example = {
  asset: {
    _createdAt: '2023-03-10T20:11:04Z',
    _id: 'image-16647a8409bd498b0eabf85e6173fc30055321d6-3091x2048-jpg',
    _rev: '7l6vPAu5IoEF7LxhjO2nQ8',
    _type: 'sanity.imageAsset',
    _updatedAt: '2023-03-10T20:11:04Z',
    assetId: '16647a8409bd498b0eabf85e6173fc30055321d6',
    extension: 'jpg',
    metadata: {
      _type: 'sanity.imageMetadata',
      blurHash: 'V-I$A-Rjaha{WC~XWBoefjay%2ozWBj[a{M|j[bFj[j[',
      dimensions: {
        _type: 'sanity.imageDimensions',
        aspectRatio: 1.50927734375,
        height: 2048,
        width: 3091,
      },
      hasAlpha: false,
      isOpaque: true,
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUIB//EACQQAAEEAgECBwAAAAAAAAAAAAEAAgMEBREGElEHExQxQmFi/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQMEBf/EABwRAAICAgMAAAAAAAAAAAAAAAABAhMDBBEUIf/aAAwDAQACEQMRAD8A0ap4i4R8JeZGA9gUzoc2xs46mWISD8d6IU88fwFaaNo8yVoPvopxd4zXhj62WJwR9rO70E/Sax8FBtz+MkaHepiG+7ghSTfZJFacwTzED9FCctzGG6R//9k=',
      palette: {
        _type: 'sanity.imagePalette',
        darkMuted: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#3e542d',
          foreground: '#fff',
          population: 3.44,
          title: '#fff',
        },
        darkVibrant: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#4c6f1b',
          foreground: '#fff',
          population: 0.06,
          title: '#fff',
        },
        dominant: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#beccc0',
          foreground: '#000',
          population: 7.39,
          title: '#fff',
        },
        lightMuted: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#beccc0',
          foreground: '#000',
          population: 7.39,
          title: '#fff',
        },
        lightVibrant: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#bfd4a5',
          foreground: '#000',
          population: 0,
          title: '#000',
        },
        muted: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#8cab53',
          foreground: '#000',
          population: 0.48,
          title: '#fff',
        },
        vibrant: {
          _type: 'sanity.imagePaletteSwatch',
          background: '#84ac52',
          foreground: '#fff',
          population: 0.11,
          title: '#fff',
        },
      },
    },
    mimeType: 'image/jpeg',
    originalFilename: 'img_03.jpeg',
    path: 'images/w3na4b2y/production/16647a8409bd498b0eabf85e6173fc30055321d6-3091x2048.jpg',
    sha1hash: '16647a8409bd498b0eabf85e6173fc30055321d6',
    size: 3776912,
    uploadId: 'tzgyX8qg2SbdKqUyA4axuybnVx9Tq8hX',
    url: 'https://cdn.sanity.io/images/w3na4b2y/production/16647a8409bd498b0eabf85e6173fc30055321d6-3091x2048.jpg',
  },
}
