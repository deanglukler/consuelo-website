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

  const menuLinkClassName =
    'hover-interactive uppercase font-light text-base lg:text-xl'
  return (
    <header className="mt-1 mb-5 flex flex-col items-center md:mt-4 md:mb-10">
      {siteLogo && (
        <Link href="/">
          <img
            src={smallImageUrl(siteLogo)}
            alt={`Site Logo`}
            className="max-h-[110px] md:max-h-[140px]"
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
        <ul
          style={{ borderColor: 'black', borderBottomWidth: 1 }}
          className="mt-3 flex w-full flex-wrap items-center justify-between gap-2 pb-3 sm:gap-4"
        >
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
                      ['font-normal']: isCurrentCategory(),
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
                ['font-normal']: currentPath === CONTACT_PAGE_PATH,
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
