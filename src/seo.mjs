import { canonicalHost, organization } from './site-facts.mjs';

export function seo({ title, description, path='/', noindex=false, image='/assets/yfa-og.png' }) {
  const canonical = new URL(path, canonicalHost).toString();
  const robots = noindex ? 'noindex,follow' : 'index,follow';
  return {
    title,
    description,
    canonical,
    robots,
    image: new URL(image, canonicalHost).toString(),
    siteName: organization.brandName,
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, canonicalHost).toString(),
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${canonicalHost}/#organization`,
    name: organization.brandName,
    legalName: organization.legalName,
    url: `${canonicalHost}/`,
    logo: `${canonicalHost}/assets/yfa-logo.png`,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Company registration number',
      value: organization.registrationNumber,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${canonicalHost}/#website`,
    url: `${canonicalHost}/`,
    name: organization.brandName,
    publisher: { '@id': `${canonicalHost}/#organization` },
    inLanguage: 'en',
  };
}
