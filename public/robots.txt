export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/*/edit'], 
    },
    sitemap: 'https://boundforthe.top/sitemap.xml',
  }
}
