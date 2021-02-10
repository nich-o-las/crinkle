import Head from 'next/head'
import Link from 'next/link'
import NavBar from './navbar'
// import {GetStaticProps} from 'next'
// import {fetchQuery} from '../lib/utils'

// const name = 'Nick Cox'
// export const siteTitle = 'Next.js Sample Website'

interface LayoutPropTypes {
  children: React.ReactNode
  location?: string
}

export default function Layout({children, location} : LayoutPropTypes) {
  return (
    <div className='font-sans min-h-screen min-w-full relative bg-gray-100'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar active={location} />
      <main className="p-4 w-full lg:max-w-screen-lg m-auto bg-white" >
        {children}
      </main>
      {location !== 'home' && (
        <div className='text-purple-100 font-mono uppercase font-semibold rounded-r-lg bg-black py-2 px-4 mt-8 inline relative -bottom-4 transform transition-transform hover:text-purple-400 hover:scale-105'>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}