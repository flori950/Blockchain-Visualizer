import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export function SEO({
  title = 'Blockchain Visualizer - Interactive Blockchain Demo',
  description = 'An interactive blockchain visualizer that demonstrates how blockchains work with proof-of-work mining, chain validation, and transaction handling. Perfect for learning blockchain concepts.',
  keywords = 'blockchain, cryptocurrency, proof-of-work, mining, hash, visualization, demo, interactive, bitcoin, ethereum, web3',
  url = 'https://flori950.github.io/blockchain-visualizer',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="flori950" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Blockchain Visualizer" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:creator" content="@flori950" />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Blockchain Visualizer',
          description: description,
          url: url,
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web Browser',
          author: {
            '@type': 'Person',
            name: 'flori950',
            url: 'https://github.com/flori950',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        })}
      </script>
    </Helmet>
  );
}
