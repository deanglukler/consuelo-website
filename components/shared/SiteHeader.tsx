/* eslint-disable @next/next/no-img-element */
import cN from 'classnames'
import Link from 'next/link'
import { PAGE_CATEGORY_PATH } from '../../lib/sanity.links'
import { PageCategory, Settings } from '../../types'
import { smallImageUrl } from '../../lib/utils'
import { useRouter } from 'next/router'
import { CONTACT_PAGE_PATH } from '../../lib/CONST'

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
  const router = useRouter()
  const currentPath = router.asPath
  const { title = '', siteLogo } = settings || {}

  const menuLinkClassName = 'hover-interactive'
  return (
    <header className="flex flex-col items-center mt-5 mb-5 md:mt-16 md:mb-10">
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
          <h1 className="text-3xl leading-tight tracking-tighter hover-interactive">
            {title}
          </h1>
        </Link>
      )}
      {pageCategories && (
        <ul className="flex flex-wrap items-center justify-around gap-2 mt-3 sm:gap-4">
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
                  className={menuLinkClassName}
                >
                  <p
                    className={cN({
                      ['font-medium']: isCurrentCategory(),
                    })}
                  >
                    {categoryName}
                  </p>
                </Link>
              )
            })}
          <Link href={CONTACT_PAGE_PATH} className={menuLinkClassName}>
            <p
              className={cN({
                ['font-medium']: currentPath === CONTACT_PAGE_PATH,
              })}
            >
              Contact
            </p>
          </Link>
        </ul>
      )}
    </header>
  )
}
