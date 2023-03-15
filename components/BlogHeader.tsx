import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import styles from './BlogHeader.module.css'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mt-5 mb-10 flex flex-col items-center md:mt-16 md:mb-12">
          <h1 className="mb-3 text-lg font-bold leading-tight tracking-tighter md:text-3xl">
            {title}
          </h1>
          <ul className="menu-links">
            <Link href="">Portfolio</Link>
            <Link href="">Films</Link>
            <Link href="">Cameras</Link>
            <Link href="">Contact</Link>
          </ul>
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="mt-8 mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
