import type { Metadata } from "next";

/**
 * Server-side metadata and structured-data layout for the Kelowna web design
 * guide. The page component is now a Server Component; this layout supplies
 * all metadata via the Next.js Metadata API and renders JSON-LD in the
 * initial HTML for search engines.
 */

const PAGE_TITLE = "How Much Does a Website Cost in Kelowna? [2026 Guide]";
const PAGE_DESCRIPTION =
  "A practical guide to website costs in Kelowna. Typical pricing, what to ask a designer, DIY vs hiring local, and a free checklist for small business owners.";
const CANONICAL_URL = "https://truenorthwebsites.com/kelowna-web-design";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    locale: "en_CA",
    url: CANONICAL_URL,
    siteName: "TrueNorth Websites",
    images: [
      {
        url: "/truenorth-logo.png",
        width: 1200,
        height: 630,
        alt: "TrueNorth Websites — Kelowna Web Design Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/truenorth-logo.png"],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How Much Does a Website Cost in Kelowna? A Small Business Guide",
      description: PAGE_DESCRIPTION,
      url: CANONICAL_URL,
      author: { "@type": "Organization", name: "TrueNorth Websites" },
      publisher: { "@type": "Organization", name: "TrueNorth Websites" },
      datePublished: "2026-06-08",
    },
    {
      "@type": "LocalBusiness",
      name: "TrueNorth Websites",
      url: "https://truenorthwebsites.com",
      email: "websitestruenorth@gmail.com",
      areaServed: [
        { "@type": "City", name: "Kelowna" },
        { "@type": "City", name: "West Kelowna" },
        { "@type": "City", name: "Vernon" },
        { "@type": "City", name: "Penticton" },
        { "@type": "City", name: "Lake Country" },
        { "@type": "City", name: "Peachland" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kelowna",
        addressRegion: "BC",
        addressCountry: "CA",
      },
    },
  ],
};

export default function KelownaWebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {children}
    </>
  );
}
