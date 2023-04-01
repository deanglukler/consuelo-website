import cN from 'classnames'
import Link from 'next/link'
import { PAGE_CATEGORY_PATH } from '../../lib/sanity.links'
import { PageCategory } from '../../types'

function sortByMenuPosition(a: PageCategory, b: PageCategory) {
  return a.menuPosition - b.menuPosition
}

export default function SiteHeader({
  title,
  pageCategories,
  currentCategory,
  level,
}: {
  title: string
  pageCategories?: PageCategory[]
  currentCategory?: PageCategory
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mt-5 mb-5 flex flex-col items-center md:mt-16 md:mb-10">
          <Link href="/">
            <h1 className="hover-interactive mb-3 text-lg leading-tight tracking-tighter md:text-3xl">
              {title}
            </h1>
          </Link>
          {pageCategories && (
            <ul className="flex flex-wrap items-center justify-around gap-2 sm:gap-4">
              {pageCategories
                .sort(sortByMenuPosition)
                .map(({ categoryName, _id, slug }) => {
                  function isCurrentCategory() {
                    if (currentCategory) {
                      return currentCategory.categoryName === categoryName
                    }
                    return false
                  }

                  return (
                    <Link
                      key={_id}
                      href={PAGE_CATEGORY_PATH(slug)}
                      className="hover-interactive hover:underline"
                    >
                      <p
                        className={cN({
                          ['font-regular text-lg underline']:
                            isCurrentCategory(),
                        })}
                      >
                        {categoryName}
                      </p>
                    </Link>
                  )
                })}
              <Link href="/contact">Contact</Link>
            </ul>
          )}
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="font-regular mt-8 mb-20 text-2xl leading-tight tracking-tight md:text-4xl md:tracking-tighter">
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
