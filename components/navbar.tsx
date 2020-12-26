import Link from 'next/link'

const logoClasses = "mr-auto p-4 bg-black shadow-lg font-logo font-bold text-4xl uppercase tracking-widest rounded transform transition-transform -rotate-3 hover:scale-105 hover:text-purple-400"
const pageLinkClasses = "ml-4 font-semibold font-mono shadow-lg uppercase p-2 rounded bg-black transform transition-transform -rotate-3 hover:scale-105 hover:text-purple-400"

export default function NavBar({active}:{active?: string}){
  return(
    <div className="flex justify-end px-6 pt-4 bg-purple-400 items-center shadow-lg after">
      <span className={`${logoClasses} ${active === 'home' ? 'text-red-400' : 'text-purple-100'}`}>
        <Link href='/'>Crinkle</Link>
      </span>
      <span className={`${pageLinkClasses} ${active === 'blog' ? 'text-red-400' : 'text-purple-100'}`}>
        <Link href='/blog'>Blog</Link>
      </span>
      <span className={`${pageLinkClasses} ${active === 'articles' ? 'text-red-400' : 'text-purple-100'}`}>
        <Link href='/articles'>Articles</Link>
      </span>
    </div>
  )
}

