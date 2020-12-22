import Head from 'next/head'
import Link from 'next/link'

const name = 'Nick Cox'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className='font-sans min-h-screen'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className='w-screen bg-gray-100 p-4'>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className='rounded-full h-52 w-52 sm:h-80 sm:w-80 m-auto shadow-lg'
              alt={name}
            />
            <h1 
              className='font-sans text-xl font-bold text-center'
            >
                {name}
              </h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className='rounded-full h-40 w-40 m-auto shadow-lg'
                  alt={name}
                />
              </a>
            </Link>
            <h2 className='font-sans text-xl font-bold text-center'>
              <Link href="/">
                <a 
                  className=''
                >
                  {name}
                </a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main className="p-4" >{children}</main>
      {!home && (
        <div className='text-blue-600 px-4'>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}