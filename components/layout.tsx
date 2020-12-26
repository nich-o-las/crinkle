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
    <div className='font-sans min-h-screen min-w-full relative'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <NavBar active={location} />
      <main className="p-4 w-full lg:max-w-screen-lg m-auto" >
        {children}
      </main>
      {location !== 'home' && (
        <div className='text-purple-100 font-mono uppercase font-semibold rounded-r-lg bg-black py-2 px-4 absolute bottom-2 transform transition-transform  hover:text-purple-400 hover:scale-105'>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}