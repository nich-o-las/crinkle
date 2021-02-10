import { GetStaticProps } from 'next'
import { getPageData, getFeatured } from '../../lib/pages'
import Link from 'next/link'
import Layout from '../../components/layout'
import Date from '../../components/date'
import FeaturedPostCard from '../../components/featuredPostCard'
import Head from 'next/head'
import { StringMappingType } from 'typescript'
import AuthorCard from '../../components/authorCard'

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
  slug: string
  publish_date: string
  description: string
  author: string
  imageUrl: string
  altText: string
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
        <h1 className="font-serif font-bold text-3xl uppercase text-center">{pageProps.title}</h1>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }} 
        />
        <ul className="grid sm:grid-cols-2 gap-8">
          {featuredArticles.map((article, idx) => {
            return(
              <li key={`article_${idx}`}>
                  <FeaturedPostCard 
                    route='articles'
                    title={article.title}
                    description={article.description}
                    author={article.author}
                    authorSlug={article.slug}
                    imageUrl={article.imageUrl}
                    altText={article.altText}
                    date={article.publish_date}
                  />
              </li>
            )
          })}
        </ul>
      </Layout>
    </>
  )
}
