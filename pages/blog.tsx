import { GetStaticProps } from 'next'
import { getFeatured, getPageData } from '../lib/pages'
import Layout from '../components/layout'
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
        <h1>{pageProps.title}</h1>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }} 
        />
        <ul>
          {featuredBlogs.map((article, idx) => <li key={`article_${idx}`}>{`${article.title} by: ${article.author}`}</li>)}
        </ul>
      </Layout>
    </>
  )
}
