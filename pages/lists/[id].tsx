import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import { getPostPaths, getPostProps } from '../../lib/pages'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostPaths('list')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const pageProps = await getPostProps('list', params.id)
  return { props: { pageProps } }
}

interface singleListPropTypes {
  title: string
  author: any
  contentHtml: string
  description: string
  publish_date: string
  image: any
}

export default function SingleBlog({pageProps}: {pageProps: singleListPropTypes}) {
  return(
    <Layout>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.description} />
      </Head>
      <h1>{pageProps.title}</h1>
      <div
        className="unreset"
        dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }}
      />
    </Layout>
  )
}