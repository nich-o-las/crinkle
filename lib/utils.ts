const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL
async function fetchQuery(path: string, params: null|string = null) {
  let url
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`
  } else {
    url = `${baseUrl}/${path}`
  }
  const response = await fetch(`${url}`)
  const data: JSON = await response.json()
  if(path === 'articles'){
    console.log('fetchQueryData: ', data)
    console.log('---------------------')
  }
  return data
}

export { baseUrl, fetchQuery }