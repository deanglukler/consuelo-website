import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import FadeInOut from './FadeInOut'
import CloseIcon from 'public/close-outline.svg'
import ArrowForwardOutline from 'public/arrow-forward-outline.svg'
import ArrowBackOutline from 'public/arrow-back-outline.svg'

export interface IFullPageGalleryViewProps {
  currentImageSource: string | null
  onClose: () => void
  onNextImage: () => void
  onPreviousImage: () => void
}

interface IUseFullPageGalleryViewProps {
  images: string[]
}

interface IFullPageGalleryViewReturn extends IFullPageGalleryViewProps {
  setCurrentImageSource: (imageUrl: string) => void
}

export const useFullPageGalleryView = ({
  images,
}: IUseFullPageGalleryViewProps): IFullPageGalleryViewReturn => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  )

  const handleClose = () => setCurrentImageIndex(null)
  const handlePreviousImage = () => {
    if (currentImageIndex === null) {
      return
    }
    const prevIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
  }
  const handleNextImage = () => {
    if (currentImageIndex === null) {
      return
    }
    const nextIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    setCurrentImageIndex(nextIndex)
  }

  const fullPageGalleryViewProps: IFullPageGalleryViewProps = {
    currentImageSource:
      currentImageIndex !== null ? images[currentImageIndex] : null,
    onClose: handleClose,
    onNextImage: handleNextImage,
    onPreviousImage: handlePreviousImage,
  }

  const setCurrentImageSource = (imageUrl: string) => {
    const index = images.indexOf(imageUrl)
    setCurrentImageIndex(index !== -1 ? index : null)
  }

  return { ...fullPageGalleryViewProps, setCurrentImageSource }
}

const FullPageGalleryView: React.FC<IFullPageGalleryViewProps> = ({
  currentImageSource,
  onClose,
  onNextImage,
  onPreviousImage,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          onPreviousImage()
          break
        case 'ArrowRight':
          onNextImage()
          break
        case 'Escape':
          onClose()
          break
      }
    }

    let startX = 0
    const handleTouchStart = (event: TouchEvent) => {
      startX = event.changedTouches[0].clientX
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX
      const deltaX = endX - startX

      if (deltaX > 5) {
        onPreviousImage()
      } else if (deltaX < -5) {
        onNextImage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    if (currentImageSource) {
      // prevent scrolling when the full page gallery is visible
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      // enable scrolling when the full page gallery is closed
      document.body.style.overflow = 'auto'
    }
  }, [currentImageSource, onClose, onNextImage, onPreviousImage])

  const isFullPageOpen = Boolean(currentImageSource)
  return (
    <FadeInOut
      visible={isFullPageOpen}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        isolation: 'isolate',
      }}
    >
      {isFullPageOpen && (
        <Image
          className="px-1 py-2 sm:px-5"
          src={currentImageSource || ''}
          alt="Beautiful Photo"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      )}
      <div>
        <button
          style={{ position: 'fixed', top: 10, right: 10 }}
          onClick={onClose}
        >
          <Image
            className="hover-interactive"
            src={CloseIcon}
            priority
            height={32}
            width={32}
            alt="Close Button"
          />
        </button>
        <button
          style={{ position: 'fixed', left: 10, top: '50%' }}
          onClick={onPreviousImage}
        >
          <Image
            className="hover-interactive opacity-50"
            src={ArrowBackOutline}
            priority
            height={32}
            width={32}
            alt="Previous Photo"
          />
        </button>
        <button
          style={{ position: 'fixed', right: 10, top: '50%' }}
          onClick={onNextImage}
        >
          <Image
            className="hover-interactive opacity-50"
            src={ArrowForwardOutline}
            priority
            height={32}
            width={32}
            alt="Next Photo"
          />
        </button>
      </div>
    </FadeInOut>
  )
}

export { FullPageGalleryView }
