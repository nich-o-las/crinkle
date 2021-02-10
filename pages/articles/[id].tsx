import Layout from '../../components/layout'
import Date from '../../components/date'
import AuthorCard from '../../components/authorCard'
import Head from 'next/head'
import { getPostPaths, getPostProps } from '../../lib/pages'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getStrapiMedia } from '../../lib/media'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostPaths('article')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const pageProps = await getPostProps('article', params.id)
  return { props: { pageProps } }
}

interface singleArticlePropTypes {
  title: string
  author: any
  contentHtml: string
  description: string
  publish_date: string
  image: any
}

export default function SingleArticle({pageProps}: {pageProps: singleArticlePropTypes}) {
  return(
    <Layout>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.description} />
      </Head>
      <div className="relative">
        <h1 className="p-2 absolute -top-2 bg-white inline underline text-bold text-2xl capitalize font-serif border-t-4 border-l-4 border-purple-400">
          {pageProps.title}
        </h1><br/>
        <div className="mt-2 p-2 inline absolute -bottom-6 right-0 bg-white border-r-4 border-b-4 border-red-400">
          <span className="opacity-60">By{' '}</span>
          <span className="underline capitalize opacity-60">
            <Link href={`/authors/${pageProps.author.slug}`}>{pageProps.author.name}</Link>
          </span>
          <span className="opacity-60">
            {' '}- <Date dateString={pageProps.publish_date}/>
          </span>
        </div>
        { pageProps.image && 
          <div className="h-60 w-full bg-gradient-to-r from-purple-400 to-red-400 flex justify-center items-center">
            <img className="h-full w-full object-contain" src={getStrapiMedia(pageProps.image.formats.large.url)}/>
          </div>
        }
      </div>
      <div className="mt-8">
        <div
          className="unreset mt-4"
          dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }}
        />
      </div>
      <AuthorCard
        name={pageProps.author.name}
        description={pageProps.author.description}
        image={pageProps.author.image.formats.thumbnail.url}
        slug={pageProps.author.slug}
      />
    </Layout>
  )
}