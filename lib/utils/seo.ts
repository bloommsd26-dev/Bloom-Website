import { Metadata } from 'next';
import { env } from '@/lib/env';

const siteConfig = {
  name: 'Bloom',
  description:
    'A student-led social impact initiative empowering children through education and mentorship',
  url: env.NEXT_PUBLIC_SITE_URL,
  image: '/og-image.jpg',
  twitterHandle: '@bloominitiative',
};

export function generateMetadata(
  title: string,
  description: string,
  image?: string,
  canonical?: string
): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image || siteConfig.image],
      creator: siteConfig.twitterHandle,
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

export function generateBlogMetadata(
  title: string,
  description: string,
  author: string,
  publishedDate: Date,
  image?: string,
  slug?: string
): Metadata {
  const fullTitle = `${title} | Bloom Blog`;
  const url = slug ? `${siteConfig.url}/blog/${slug}` : siteConfig.url;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
      authors: [author],
      publishedTime: publishedDate.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image || siteConfig.image],
    },
    alternates: { canonical: url },
  };
}
