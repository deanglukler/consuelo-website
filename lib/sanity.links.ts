export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

export function PAGE_CATEGORY_PATH(category: string) {
  return `/${category}`
}

export function PAGE_PATH(category: string, page: string) {
  return `/${category}/${page}`
}
