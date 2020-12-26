import {fetchQuery} from './utils'
import remark from 'remark'
import html from 'remark-html'

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL


export async function getPageData(page: string){
  const response = await fetch(`${baseUrl}/${page}`)
  const data = await response.json()
  const processedContent = await remark()
    .use(html)
    .process(data.content)
  const contentHtml = processedContent.toString()
  const {title, description} = data
  return {title, description, contentHtml}
}

export async function getFeatured(postType: string){
  const response = await fetch(`${baseUrl}/posts?category.name=${postType}&featured=true`)
  const data = await response.json()
  const sortedData = data.map(post => {
    return(
      { 
        title: post.title, 
        publish_date: post.publish_date, 
        description: post.description,
        author: post.author.name
      }
    )
  })
  return sortedData
}