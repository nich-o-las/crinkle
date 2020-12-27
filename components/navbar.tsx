import Link from 'next/link'
import {useState} from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const logoClasses = "z-10 mr-auto p-4 bg-black shadow-lg font-logo font-bold text-2xl md:text-4xl uppercase tracking-widest rounded transform transition-transform -rotate-3 hover:scale-105 hover:text-purple-400"
const pageLinkClasses = "ml-4 font-semibold font-mono shadow-lg uppercase p-2 rounded bg-black transform transition-transform -rotate-3 hover:scale-105 hover:text-purple-400 hidden md:inline"
const dropDownLinkClasses = "font-semibold font-mono uppercase ml-6 my-4 text-black "

export default function NavBar({active}:{active?: string}){
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => { setIsExpanded(!isExpanded) }

  return(
    <>
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
      <span className={`${pageLinkClasses} ${active === 'lists' ? 'text-red-400' : 'text-purple-100'}`}>
        <Link href='/lists'>Lists</Link>
      </span>
      <button onClick={toggleExpanded} className='p-4 border rounded-lg md:hidden inline'> 
        { isExpanded ? <FiX/> : <FiMenu/> }
      </button>
    </div>
    <div className={`bg-purple-400 transition-all ease-out overflow-hidden origin-top transform ${!isExpanded ? 'h-0' : 'h-auto'}`}>
      <div className={`${dropDownLinkClasses} ${active === 'blog' && 'underline'}`}>
        <Link href='/blog'>Blog</Link>
      </div>
      <div className={`${dropDownLinkClasses} ${active === 'articles' && 'underline'}`}>
        <Link href='/articles'>Articles</Link>
      </div>
      <div className={`${dropDownLinkClasses} ${active === 'lists' && 'underline'}`}>
        <Link href='/lists'>Lists</Link>
      </div>
    </div>
    </>
  )
}

