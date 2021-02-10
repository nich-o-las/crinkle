import { GetStaticProps } from 'next'
import { getFeatured, getPageData } from '../../lib/pages'
import Layout from '../../components/layout'
import FeaturedPostCard from '../../components/featuredPostCard'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const pageProps = await getPageData('blog-page')
  const featuredBlogs = await getFeatured('blog')
  return {
    props: {pageProps, featuredBlogs}
  }
}

interface pagePropTypes {
  title: string
  description: string
  contentHtml: any
}

interface featuredBlogTypes {
  title: string
  slug: string
  publish_date: string
  description: string
  author: string
  imageUrl: string
  altText: string
}

export default function BlogPage(
  {pageProps, featuredBlogs}: 
  {pageProps: pagePropTypes, featuredBlogs: featuredBlogTypes[]}
  ){
  return(
    <>
      <Head>
        <title>{pageProps.title}</title>
        <meta
          name="description"
          content={pageProps.description}
        />
        <meta name="og:title" content={pageProps.title} />
      </Head>
      <Layout location="blog">
        <h1 className="font-serif font-bold text-3xl uppercase text-center">{pageProps.title}</h1>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }} 
        />
        <ul className="grid sm:grid-cols-2 gap-8">
          {featuredBlogs.map((blog, idx) => {
              return(
                <li key={`blog_${idx}`}>
                  <FeaturedPostCard 
                    route='blog'
                    title={blog.title}
                    description={blog.description}
                    author={blog.author}
                    authorSlug={blog.slug}
                    imageUrl={blog.imageUrl}
                    altText={blog.altText}
                    date={blog.publish_date}
                  />
              </li>
              )})
            }
        </ul>
      </Layout>
    </>
  )
}
