const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the CDN in production and localhost for development.
  // assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_URL : 'localhost:1337'
  images: {
    path: process.env.NEXT_PUBLIC_BASE_URL,
    domains: [process.env.NEXT_PUBLIC_BASE_URL]
  }
}