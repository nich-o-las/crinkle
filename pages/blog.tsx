import { GetStaticProps } from 'next'
import { getPageData } from '../lib/pages'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async () => {
  const pageProps = await getPageData('blog-page')
  return {
    props: {pageProps}
  }
}

interface pagePropTypes {
  title: string
  description: string
  contentHtml: any
}

export default function BlogPage({pageProps}: {pageProps: pagePropTypes}){
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
      </Layout>
    </>
  )
}
