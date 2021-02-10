import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import Link from 'next/link'
import AuthorCard from '../../components/authorCard'
import { getStrapiMedia } from '../../lib/media'
import { getPostPaths, getPostProps } from '../../lib/pages'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostPaths('blog')
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const pageProps = await getPostProps('blog', params.id)
  return { props: { pageProps } }
}

interface singleBlogPropTypes {
  title: string
  author: any
  contentHtml: string
  description: string
  publish_date: string
  image: any
}

export default function SingleBlog({pageProps}: {pageProps: singleBlogPropTypes}) {
  return(
    <Layout>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.description} />
      </Head>
      <h1 className="text-bold text-2xl capitalize font-serif">{pageProps.title}</h1>
      <span className="underline capitalize opacity-60">
        <Link href={`/authors/${pageProps.author.slug}`}>{pageProps.author.name}</Link>
      </span>
      <span className="opacity-60">
        {' '}- <Date dateString={pageProps.publish_date}/>
      </span>
      { pageProps.image && 
        <div className="h-60 w-full bg-gradient-to-r from-purple-400 to-red-400 flex justify-center items-center">
          <img className="max-h-full w-auto" src={getStrapiMedia(pageProps.image.formats.large.url)}/> 
        </div>
      }
      <div
        className="unreset"
        dangerouslySetInnerHTML={{ __html: pageProps.contentHtml }}
      />
      <AuthorCard
        name={pageProps.author.name}
        description={pageProps.author.description}
        image={pageProps.author.image.formats.thumbnail.url}
        slug={pageProps.author.slug}
      />
    </Layout>
  )
}