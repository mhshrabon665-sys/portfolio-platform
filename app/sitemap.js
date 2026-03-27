export default async function sitemap() {
  const baseUrl = 'https://boundforthe.top';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  try {
    // NOTE: Replace this with your actual database fetching logic
    const users = await fetch('https://your-api.com/users').then(res => res.json());
    
    const dynamicRoutes = users.map((user) => ({
      url: `${baseUrl}/${user.username}`,
      lastModified: user.updatedAt ? new Date(user.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    return staticRoutes;
  }
}
