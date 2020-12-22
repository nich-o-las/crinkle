import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="max-w-screen-lg m-auto">
        <p className='font-bold text-xl'>
          My name is Nick. I'm a web developer.
        </p>
        <p className='font-semibold text-lg my-2'>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className="max-w-screen-lg m-auto">
        <h2 className='font-bold text-lg mb-2'>
          Blog
        </h2>
        <div className="unreset">
        <ul className=''>
          {allPostsData.map(({ id, date, title }) => (
            <li className='' key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className=''>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}