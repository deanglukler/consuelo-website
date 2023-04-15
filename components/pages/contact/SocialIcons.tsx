import React from 'react'
import { Socials } from '../../../types'
import Link from 'next/link'
import Mail from 'public/social/mail-outline.svg'
import LinkedIn from 'public/social/logo-linkedin.svg'
import Facebook from 'public/social/logo-facebook.svg'
import Instagram from 'public/social/logo-instagram.svg'
import Twitter from 'public/social/logo-twitter.svg'
import YouTube from 'public/social/logo-youtube.svg'
import TikTok from 'public/social/logo-tiktok.svg'
import Pinterest from 'public/social/logo-pinterest.svg'
import Image from 'next/image'

export type ISocialIconsProps = {
  socials?: Socials
}

const SOCIAL_ICON_SIZE = 32

const SocialIcons: React.FC<ISocialIconsProps> = ({ socials }) => {
  const {
    email,
    linkedIn,
    facebook,
    instagram,
    twitter,
    youtube,
    tiktok,
    pinterest,
  } = socials || {}
  return (
    <div className="flex gap-2">
      {email && (
        <Link href={`mailto:${email}`}>
          <Image
            className="hover-interactive"
            src={Mail}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="Social Email Button"
          />
        </Link>
      )}
      {linkedIn && (
        <Link href={linkedIn}>
          <Image
            className="hover-interactive"
            src={LinkedIn}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="LinkedIn Page"
          />
        </Link>
      )}
      {facebook && (
        <Link href={facebook}>
          <Image
            className="hover-interactive"
            src={Facebook}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="Facebook Page"
          />
        </Link>
      )}
      {instagram && (
        <Link href={instagram}>
          <Image
            className="hover-interactive"
            src={Instagram}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="Instagram Page"
          />
        </Link>
      )}
      {twitter && (
        <Link href={twitter}>
          <Image
            className="hover-interactive"
            src={Twitter}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="Twitter Page"
          />
        </Link>
      )}
      {youtube && (
        <Link href={youtube}>
          <Image
            className="hover-interactive"
            src={YouTube}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="YouTube Page"
          />
        </Link>
      )}
      {tiktok && (
        <Link href={tiktok}>
          <Image
            className="hover-interactive"
            src={TikTok}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="TikTok Page"
          />
        </Link>
      )}
      {pinterest && (
        <Link href={pinterest}>
          <Image
            className="hover-interactive"
            src={Pinterest}
            height={SOCIAL_ICON_SIZE}
            width={SOCIAL_ICON_SIZE}
            alt="Pinterest Page"
          />
        </Link>
      )}
    </div>
  )
}

export { SocialIcons }
