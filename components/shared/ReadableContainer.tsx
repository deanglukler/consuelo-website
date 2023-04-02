import React from 'react'
import Container from './Container'

export type IReadableContainerProps = React.PropsWithChildren

const ReadableContainer: React.FC<IReadableContainerProps> = ({ children }) => {
  return (
    <Container>
      <div className="mx-auto max-w-2xl">{children}</div>
    </Container>
  )
}

export { ReadableContainer }
