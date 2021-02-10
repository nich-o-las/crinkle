import Date from './date'
import { getStrapiMedia } from '../lib/media'
import Link from 'next/link'

interface postPropTypes{
  title: string
  author: string
  authorSlug: string
  imageUrl: string
  altText: string
  description: string
  date: string
  route: string
}

export default function FeaturedPostCard({route, authorSlug, title, author, imageUrl, altText, description, date}: postPropTypes){
  return(
    <div className="flex h-28 rounded overflow-hidden border">
      <div className="w-1/4 bg-purple-400">
        <img 
          className="object-contain h-full w-full"
          src={getStrapiMedia(imageUrl)} 
          alt={altText} 
        />
      </div>
      <div className="w-3/4 p-2">
        <p className="text-bold capitalize font-serif text-lg">
          <Link href={`${route}/${authorSlug}`}>
            {title}
          </Link>
        </p>
        <p>{description}</p>
        <div className="opacity-60"><span className="underline">{author}</span> - <Date dateString={date}/></div>
      </div>
    </div>
  )
}