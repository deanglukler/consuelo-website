import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import FadeInOut from '../FadeInOut'

interface Props {
  src: string
  alt?: string
  thumbnailStyle?: React.CSSProperties
  thumbnailClassName?: string
}

function GalleryImage({ src, alt, thumbnailStyle, thumbnailClassName }: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleClose = () => {
    setIsFullScreen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleClick = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <>
      <div
        style={thumbnailStyle}
        className={thumbnailClassName}
        onClick={handleClick}
      >
        <Image
          src={src}
          alt={alt || 'Beautiful Photo'}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <FadeInOut
        visible={isFullScreen}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleClose}
      >
        <Image
          src={src}
          alt={alt || 'Beautiful Photo'}
          sizes="100vw"
          fill
          style={{
            padding: '3rem',
            objectFit: 'contain',
          }}
          onLoad={(event) => {
            event.currentTarget.style.opacity = '1'
          }}
        />
      </FadeInOut>
    </>
  )
}

export default GalleryImage
