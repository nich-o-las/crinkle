import Link from 'next/link'
import { getStrapiMedia } from '../lib/media'

interface authorCardPropTypes{
  name: string
  image: any
  description: string
  slug: string
}

export default function AuthorCard({name, image, description, slug}: authorCardPropTypes){
  return(
    <>
    <p className="opacity-60 mb-2">About The Author</p>
    <div className="inline-flex w-full sm:w-1/2 md:w-1/3">
      <div className="pr-2 w-1/4 border-r-2">
        <img 
          className= "rounded-full h-16 m-auto" 
          src={getStrapiMedia(image)}
          alt={description}
        />
      </div>
      <div className="w-2/3 p-2">
        <p className="font-bold"><Link href={`/authors/${slug}`}>{name}</Link></p>
        <p className="">{description}</p>
      </div>
    </div>
    </>
  )
}