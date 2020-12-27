import { GetStaticProps } from 'next'
import { getFeatured, getPageData } from '../../lib/pages'
import Date from '../../components/date'
import Layout from '../../components/layout'
import Link from 'next/link'
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
  publish_date: string
  description: string
  author: string
  slug: string
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
        <ul>
          {featuredBlogs.map((blog, idx) => {
              return(
                <li key={`blog_${idx}`}>
                  <p className="font-semibold text-lg capitalize underline">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </p>
                  <p className="opacity-60">{blog.author} - <Date dateString={blog.publish_date}/></p>
                  <p>{blog.description}</p>
                </li>
              )})
            }
        </ul>
      </Layout>
    </>
  )
}
