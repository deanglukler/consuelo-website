export function PAGE_CATEGORY_PATH(category: string) {
  return `/${category}`
}

export function PAGE_PATH(
  category: string | undefined,
  page: string | undefined
) {
  if (!category || !page) {
    return `/NOTFOUND`
  }
  return `/${category}/${page}`
}
