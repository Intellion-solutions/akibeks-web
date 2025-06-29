
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ 
  title = "AKIBEKS Engineering Solutions - Premier Construction Company in Kenya",
  description = "Leading construction and engineering company in Kenya with 15+ years of experience. Specializing in residential, commercial, and infrastructure projects. Licensed by NCA.",
  keywords = "construction Kenya, engineering solutions, building contractors, residential construction, commercial construction, civil engineering, NCA licensed, Nairobi construction",
  image = "/placeholder.svg",
  url = "https://akibeks.co.ke",
  type = "website"
}: SEOHeadProps) => {
  const fullTitle = title.includes("AKIBEKS") ? title : `${title} | AKIBEKS Engineering Solutions`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AKIBEKS Engineering Solutions" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AKIBEKS Engineering Solutions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      <meta name="language" content="en" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AKIBEKS Engineering Solutions",
          "url": "https://akibeks.co.ke",
          "logo": `${url}/logo.png`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KE",
            "addressLocality": "Nairobi"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-710-245-118",
            "contactType": "customer service",
            "email": "info@akibeks.co.ke"
          },
          "sameAs": [
            "https://www.facebook.com/akibeks",
            "https://www.linkedin.com/company/akibeks",
            "https://twitter.com/akibeks"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
