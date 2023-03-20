import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { PAGE_CATEGORY_PATH } from '../lib/sanity.links'
import { PageCategory } from '../types'

export default function SiteHeader({
  title,
  pageCategories,
  level,
}: {
  title: string
  pageCategories: PageCategory[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mt-5 mb-10 flex flex-col items-center md:mt-16 md:mb-12">
          <Link href="/">
            <h1 className="mb-3 text-lg font-bold leading-tight tracking-tighter md:text-3xl">
              {title}
            </h1>
          </Link>
          <ul className="menu-links">
            <Link href="">Portfolio</Link>
            {pageCategories.map(({ categoryName, _id, slug }) => {
              return (
                <Link key={_id} href={PAGE_CATEGORY_PATH(slug)}>
                  {categoryName}
                </Link>
              )
            })}
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
