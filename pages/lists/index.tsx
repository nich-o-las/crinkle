import { GetStaticProps } from 'next'
import { getPageData, getFeatured } from '../../lib/pages'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Link from 'next/link'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const pageProps = await getPageData('list-page')
  const featuredLists = await getFeatured('list')
  return {
    props: {pageProps, featuredLists}
  }
}

interface pagePropTypes {
  title: string
  description: string
  contentHtml: any
}

interface featuredListTypes {
  title: string
  publish_date: string
  description: string
  author: string
  slug: string
}

export default function ListPage(
  {
    pageProps, 
    featuredLists
  }: {
    pageProps: pagePropTypes, 
    featuredLists: featuredListTypes[]
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
      <Layout location='lists'>
        <h1 className="font-serif font-bold text-3xl uppercase text-center">{pageProps.title}</h1>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }} 
        />
        <ul>
          {featuredLists.map((list, idx) => {
            return(
              <li key={`list_${idx}`}>
                <p className="font-semibold text-lg capitalize underline">
                  <Link href={`/lists/${list.slug}`}>{list.title}</Link>
                </p>
                <p className="opacity-60">{list.author} - <Date dateString={list.publish_date}/></p>
                <p>{list.description}</p>
              </li>
            )
          })}
        </ul>
      </Layout>
    </>
  )
}
