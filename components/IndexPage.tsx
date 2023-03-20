import Container from 'components/Container'
import SiteHeader from 'components/SiteHeader'
import Layout from 'components/Layout'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import { Gallery, PageCategory, Post, Settings } from '../types'
import HomeGallery from './homepage/HomeGallery'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  homeGallery: Gallery
  posts: Post[]
  settings: Settings
  pageCategories: PageCategory[]
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, settings, homeGallery, pageCategories } = props
  const { title = demo.title } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <SiteHeader title={title} pageCategories={pageCategories} level={1} />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          <HomeGallery images={homeGallery.images} />
        </Container>
      </Layout>
    </>
  )
}
