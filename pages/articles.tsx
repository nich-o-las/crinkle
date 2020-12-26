import { GetStaticProps } from 'next'
import { getPageData, getFeatured } from '../lib/pages'
import Layout from '../components/layout'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const pageProps = await getPageData('article-page')
  const featuredArticles = await getFeatured('article')
  return {
    props: {pageProps, featuredArticles}
  }
}

interface pagePropTypes {
  title: string
  description: string
  contentHtml: any
}

interface featuredArticleTypes {
  title: string
  publish_date: string
  description: string
  author: string
}

export default function ArticlePage(
  {
    pageProps, 
    featuredArticles
  }: {
    pageProps: pagePropTypes, 
    featuredArticles: featuredArticleTypes[]
  }){
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
      <Layout location='articles'>
        <h1>{pageProps.title}</h1>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }} 
        />
        <ul>
          {featuredArticles.map((article, idx) => <li key={`article_${idx}`}>{`${article.title} by: ${article.author}`}</li>)}
        </ul>
      </Layout>
    </>
  )
}
