import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'
import type { Image } from 'sanity'

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `head.tsx` files in the /app dir or wrapped in a <Head> component in the /pages dir.
 */
export function SiteMeta({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string
  description?: string
  image?: Image
  title?: string
}) {
  return null
}
