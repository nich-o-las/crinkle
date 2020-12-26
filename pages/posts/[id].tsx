import Layout from '../../components/layout'
import {useEffect} from 'react'
import { getAllPostSlugs, getPostDataFromSlug } from '../../lib/posts'
// import Image from 'next/image'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getStrapiMedia } from '../../lib/media'

export default function Post({
  postData
}: {
  postData: {
    title: string
    publish_date: string
    contentHtml: string
    image?,
    category: string
  }
}) {

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="max-w-screen-lg m-auto">
        <h1 
          className='font-black text-2xl'
        >
          {postData.title}
        </h1>
        {/* {console.log(postData.image)} */}
        <img
          src={getStrapiMedia(postData.image.url)}
          alt={postData.image.alternativeText || 'a cute shot'}
        />
        <div 
          className='text-sm font-semibold my-1 text-gray-400'
        >
          <Date dateString={postData.publish_date} />
        </div>
        <div 
          className="unreset"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async({ params }: any) => {
  const postData = await getPostDataFromSlug(params.id)
  return {
    props: {
      postData
    }
  }
}