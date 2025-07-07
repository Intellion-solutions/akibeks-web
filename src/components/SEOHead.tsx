
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOHead = ({ 
  title = "AKIBEKS Engineering Solutions - Premier Construction Company in Kenya",
  description = "Leading construction and engineering company in Kenya with 15+ years of experience. Specializing in residential, commercial, and infrastructure projects. Licensed by NCA.",
  keywords = "construction Kenya, engineering solutions, building contractors, residential construction, commercial construction, civil engineering, NCA licensed, Nairobi construction, Mombasa construction, Kisumu construction, construction company Kenya, building contractors Nairobi, civil engineering Kenya, architectural services Kenya, project management Kenya, construction services, engineering consultancy Kenya, infrastructure development Kenya, construction quotes Kenya, building permits Kenya, construction materials Kenya",
  image = "/placeholder.svg",
  url = "https://akibeks.co.ke",
  type = "website",
  author = "AKIBEKS Engineering Solutions",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOHeadProps) => {
  const fullTitle = title.includes("AKIBEKS") ? title : `${title} | AKIBEKS Engineering Solutions`;
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Enhanced Meta Tags */}
      <meta name="language" content="en" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="classification" content="business" />
      <meta name="category" content="construction, engineering, building" />
      <meta name="coverage" content="worldwide" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="theme-color" content="#1e40af" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="AKIBEKS Engineering Solutions" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="sw_KE" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@akibeks" />
      <meta name="twitter:creator" content="@akibeks" />

      {/* Geographic and Local SEO */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage" content="Kenya" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AKIBEKS" />

      {/* Enhanced Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${canonicalUrl}/#organization`,
              "name": "AKIBEKS Engineering Solutions",
              "url": canonicalUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${canonicalUrl}/logo.png`,
                "width": 300,
                "height": 100
              },
              "description": description,
              "foundingDate": "2008",
              "numberOfEmployees": "50-100",
              "industry": "Construction and Engineering",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Enterprise Road",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi",
                "postalCode": "00100",
                "addressCountry": "KE"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+254-710-245-118",
                  "contactType": "customer service",
                  "email": "info@akibeks.co.ke",
                  "availableLanguage": ["en", "sw"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+254-710-245-118",
                  "contactType": "sales",
                  "email": "sales@akibeks.co.ke"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/akibeks",
                "https://www.linkedin.com/company/akibeks",
                "https://twitter.com/akibeks",
                "https://www.instagram.com/akibeks"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Kenya"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -1.286389,
                  "longitude": 36.817223
                },
                "geoRadius": "500000"
              }
            },
            {
              "@type": "WebSite",
              "@id": `${canonicalUrl}/#website`,
              "url": canonicalUrl,
              "name": "AKIBEKS Engineering Solutions",
              "description": description,
              "publisher": {
                "@id": `${canonicalUrl}/#organization`
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${canonicalUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "LocalBusiness",
              "@id": `${canonicalUrl}/#localbusiness`,
              "name": "AKIBEKS Engineering Solutions",
              "image": `${canonicalUrl}/logo.png`,
              "telephone": "+254-710-245-118",
              "email": "info@akibeks.co.ke",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Enterprise Road",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi",
                "postalCode": "00100",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.286389,
                "longitude": 36.817223
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "13:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              },
              "priceRange": "$$"
            }
          ]
        })}
      </script>

      {/* Additional SEO enhancements */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
