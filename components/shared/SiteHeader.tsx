/* eslint-disable @next/next/no-img-element */
import cN from 'classnames'
import Link from 'next/link'
import { PAGE_CATEGORY_PATH } from '../../lib/sanity.links'
import { PageCategory, Settings } from '../../types'
import { smallImageUrl } from '../../lib/utils'

function sortByMenuPosition(a: PageCategory, b: PageCategory) {
  return a.menuPosition - b.menuPosition
}

export default function SiteHeader({
  settings,
  pageCategories,
  currentCategory,
}: {
  pageCategories?: PageCategory[]
  currentCategory?: PageCategory
  settings: Settings | undefined
}) {
  const { title = '', siteLogo } = settings || {}
  return (
    <header className="mt-5 mb-5 flex flex-col items-center md:mt-16 md:mb-10">
      {siteLogo && (
        <Link href="/">
          <img
            src={smallImageUrl(siteLogo)}
            alt={`Site Logo`}
            className="max-w-[150px]"
          />
        </Link>
      )}
      {/* if no logo, render site title */}
      {title && !siteLogo && (
        <Link href="/">
          <h1 className="hover-interactive text-3xl leading-tight tracking-tighter">
            {title}
          </h1>
        </Link>
      )}
      {pageCategories && (
        <ul className="mt-3 flex flex-wrap items-center justify-around gap-2 sm:gap-4">
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
                      ['font-medium underline']: isCurrentCategory(),
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
}
