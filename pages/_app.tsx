import 'tailwindcss/tailwind.css'
import './global.css'

import { IBM_Plex_Mono, PT_Serif, Jost } from '@next/font/google'
import { AppProps } from 'next/app'
import { useDisableImgContextMenu } from '../components/shared/hooks'

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600'],
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  useDisableImgContextMenu()
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: ${serif.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
