import { PortableText } from '@portabletext/react'
import cN from 'classnames'
import Link from 'next/link'
import { PAGE_CATEGORY_PATH } from '../lib/sanity.links'
import { PageCategory } from '../types'

export default function SiteHeader({
  title,
  pageCategories,
  currentCategory,
  level,
}: {
  title: string
  pageCategories: PageCategory[]
  currentCategory?: PageCategory
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="flex flex-col items-center mt-5 mb-10 md:mt-16 md:mb-12">
          <Link href="/">
            <h1 className="mb-3 text-lg font-bold leading-tight tracking-tighter md:text-3xl">
              {title}
            </h1>
          </Link>
          <ul className="flex flex-wrap items-center justify-around gap-2 sm:gap-4">
            {pageCategories.map(({ categoryName, _id, slug }) => {
              function isCurrentCategory() {
                if (currentCategory) {
                  return currentCategory.categoryName === categoryName
                }
                return false
              }

              return (
                <Link key={_id} href={PAGE_CATEGORY_PATH(slug)}>
                  <p
                    className={cN({
                      ['text-lg font-bold underline']: isCurrentCategory(),
                    })}
                  >
                    {categoryName}
                  </p>
                </Link>
              )
            })}
            <Link href="/contact">Contact</Link>
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
