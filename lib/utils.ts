import { Image } from 'sanity'
import { urlForImage } from 'lib/sanity.image'
import { IMAGE_WIDTH } from './CONST'

const SM_IMG_WIDTH = IMAGE_WIDTH.sm
const LG_IMG_WIDTH = IMAGE_WIDTH.lg

export function largeImageUrl(s: Image | undefined) {
  return urlForImage(s).width(LG_IMG_WIDTH).url()
}
export function smallImageUrl(s: Image | undefined) {
  return urlForImage(s).width(SM_IMG_WIDTH).url()
}
