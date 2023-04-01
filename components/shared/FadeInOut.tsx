import {
  useState,
  useEffect,
  PropsWithChildren,
  CSSProperties,
  HTMLAttributes,
} from 'react'

interface Props
  extends PropsWithChildren<{ visible: boolean }>,
    HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties
}

const TIME = 700

const FadeInOut = ({ visible, children, style, ...rest }: Props) => {
  const [show, setShow] = useState(false)
  const [opacity, setOpacity] = useState<0 | 1>(visible ? 1 : 0)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const timeoutId = setTimeout(() => {
        setOpacity(1)
      }, 100)
      return () => clearTimeout(timeoutId)
    } else {
      setOpacity(0)
      const timeoutId = setTimeout(() => {
        setShow(false)
      }, TIME)
      return () => clearTimeout(timeoutId)
    }
  }, [visible])

  if (!show) {
    return null
  }

  return (
    <div
      style={{
        opacity,
        transition: `all ${TIME / 3}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export default FadeInOut
