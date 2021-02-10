import remark from 'remark'
import html from 'remark-html'
import { fetchQuery } from './utils'

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
    return { 
        title: post.title, 
        slug: post.slug,
        publish_date: post.publish_date, 
        description: post.description,
        author: post.author.name,
        authorSlug: post.author.slug,
        imageUrl: (post.image ? post.image.formats.thumbnail.url : ''),
        altText: (post.image ? post.image.alternativeText : '')
      }
  })
  return sortedData
}

export async function getPostPaths(collection: string){
  const response = await fetch(`${baseUrl}/posts?category.name=${collection}`)
  const data = await response.json()
  const sortedData = data.map(post => {
    return { params: { id: post.slug } }
  })
  return sortedData
}

export async function getPostProps(collection: string, slug){
  const response = await fetch(`${baseUrl}/posts?category.name=${collection}&slug=${slug}`)
  const data = await response.json()
  const singleData = data[0]
  const processedContent = await remark()
    .use(html)
    .process(singleData.content)
  const contentHtml = processedContent.toString()
  const { title, publish_date, description, author, image } = singleData
  return { title, publish_date, description, author, image, contentHtml }
}

export async function getAuthorPaths(){
  const data = await fetchQuery('authors')
  const paths = await data.map(item => {
    return { params: { id: item.slug } }
  })
  return paths
}

export async function getAuthorProps(slug){
  const response = await fetch(`${baseUrl}/authors?slug=${slug}`)
  const data = await response.json()
  const singleData = data[0]
  const processedContent = await remark()
    .use(html)
    .process(singleData.bio)
  const contentHtml = processedContent.toString()
  const { description, name, image } = singleData
  return { description, name, image, contentHtml }
}