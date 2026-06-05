import { IBlog } from '@/models/Blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bloom.org';

/**
 * Generate Organization (NGO) Schema
 */
export function generateNGOOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Bloom',
    alternateName: 'Bloom Social Initiative',
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    description:
      'A student-led social impact initiative from Maxfort School, Delhi, empowering children through education, mentorship, and creative opportunities.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/bloominitiative',
      'https://linkedin.com/company/bloominitiative',
      'https://twitter.com/bloominitiative',
    ],
    founder: {
      '@type': 'Organization',
      name: 'Maxfort School Students',
    },
    nonprofitStatus: 'Nonprofit501c3', // Generic mapping for NGO
  };
}

/**
 * Generate Blog Posting Schema
 */
export function generateBlogPostSchema(blog: IBlog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || `${siteUrl}/og-image.jpg`,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'NGO',
      name: 'Bloom',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${blog.slug}`,
    },
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.item}`,
    })),
  };
}

/**
 * Generate NGO Program/Service Schema
 */
export function generateProgramSchema(program: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Educational Program',
    provider: {
      '@type': 'NGO',
      name: 'Bloom',
    },
    name: program.title,
    description: program.description,
    areaServed: {
      '@type': 'City',
      name: 'Delhi',
    },
    url: `${siteUrl}/programs#${program.slug}`,
  };
}
