import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { PortableTextBlock } from 'sanity'

interface Props {
  imageSrc: string
  title: string | undefined
  body: PortableTextBlock[] | undefined
}

const ParallaxPage = ({ imageSrc, title, body }: Props) => {
  return (
    <Parallax pages={2} style={{ height: 200 }}>
      <ParallaxLayer
        speed={0.5}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <ParallaxLayer
        offset={0}
        speed={0.2}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {title && <h1 className="text-6xl">{title}</h1>}
      </ParallaxLayer>
      <ParallaxLayer offset={1}>
        {body && (
          <CustomPortableText
            paragraphClasses="max-w-3xl text-gray-600 text-xl leading-8 pb-2"
            value={body}
          />
        )}
      </ParallaxLayer>
    </Parallax>
  )
}

export default ParallaxPage
