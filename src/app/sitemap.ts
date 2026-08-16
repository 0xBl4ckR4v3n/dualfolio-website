import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/cybersecurity-portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/engineering-portfolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}