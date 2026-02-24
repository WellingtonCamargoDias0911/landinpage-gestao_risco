export const SITE_URL = 'https://grafocapital.com'; // Replace with actual domain
export const COMPANY_NAME = 'Grafo Capital';
export const COMPANY_LOGO = 'https://horizons-cdn.hostinger.com/c45e6ee7-d291-42e1-bbe2-4397bc561d93/141e5143af484e73ba6ea23a6f9b318e.png';
export const CONTACT_PHONE = '+55 11 99999-9999';
export const CONTACT_EMAIL = 'contato@grafocapital.com';

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": COMPANY_NAME,
  "url": SITE_URL,
  "logo": COMPANY_LOGO,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": CONTACT_PHONE,
    "contactType": "customer service",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.linkedin.com/company/grafo-capital",
    "https://www.instagram.com/grafocapital"
  ]
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": COMPANY_NAME,
  "image": COMPANY_LOGO,
  "telephone": CONTACT_PHONE,
  "email": CONTACT_EMAIL,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Paulista, 1000",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "01310-100",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
});

export const getProductSchema = (name, description) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "brand": {
    "@type": "Brand",
    "name": COMPANY_NAME
  },
  "offers": {
    "@type": "Offer",
    "url": `${SITE_URL}/${name.toLowerCase().replace(/ /g, '-')}`,
    "priceCurrency": "BRL",
    "price": "0.00",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": COMPANY_NAME
    }
  }
});

export const getFAQSchema = (faqData) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(item => ({
    "@type": "Question",
    "name": item.question || item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer || item.a
    }
  }))
});

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});