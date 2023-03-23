import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const ParallaxImageWithTitle = ({ imageSrc, title }) => {
  return (
    <Parallax pages={2}>
      <ParallaxLayer
        speed={0.3}
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
        <h1>HELLO</h1>
      </ParallaxLayer>
    </Parallax>
  )
}

export default ParallaxImageWithTitle
