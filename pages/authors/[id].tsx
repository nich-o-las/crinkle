import Layout from '../../components/layout'
import Date from '../../components/date'
import Image from 'next/image'
import Head from 'next/head'
import { getAuthorPaths, getAuthorProps } from '../../lib/pages'
import { fetchQuery } from '../../lib/utils'
import { getStrapiMedia } from '../../lib/media'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAuthorPaths()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const pageProps = await getAuthorProps(params.id)
  return { props: { pageProps } }
}

interface singleBlogPropTypes {
  name: string
  contentHtml: string
  description: string
  image
}

export default function SingleAuthor({pageProps}: {pageProps: singleBlogPropTypes}) {
  return(
    <Layout>
      <Head>
        <title>{pageProps.name}</title>
        <meta name="description" content={pageProps.description} />
      </Head>
      <h1 className="font-bold font-serif capitalize text-2xl text-center md:mb-2">
        <span className="opacity-60">Crinkle Contributor:</span> {pageProps.name}
      </h1>
      <img
        src={getStrapiMedia(pageProps.image.formats.medium.url)}
        alt={pageProps.image.altText}
        className="sm:float-left md:w-1/3 sm:w-1/2 rounded-lg w-full h-auto mr-4 mb-4 border-purple-400 border-8 shadow"
      />
      <div
        className="unreset pb-8"
        dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }}
      />
    </Layout>
  )
}