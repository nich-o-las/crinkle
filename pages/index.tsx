import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getPageData } from '../lib/pages'

export const getStaticProps: GetStaticProps = async () => {
  const pageProps = await getPageData('home-page')
  return {
    props: {pageProps}
  }
}

interface PagePropTypes {
  title: string
  description: string
  contentHtml: any
}

export default function Home({pageProps}: {pageProps: PagePropTypes}){
  return (
    <>
      <Layout location='home'>
        <Head>
          <title>{pageProps.title}</title>
          <meta name="description" content={pageProps.description}/>
          <meta name="og:title" content={pageProps.title} />
        </Head>
        <h1 className="font-bold font-serif text-3xl uppercase text-center">{pageProps.title}</h1>
        <div
          className="unreset"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml}}
        />
      </Layout>
    </>
  )
}