import type { Metadata } from "next";

/**
 * Server-side metadata and structured-data layout for the About page.
 *
 * Metadata values are ported unchanged from the page's previous life as a
 * standalone public/about.html static file, now migrated into the Next.js
 * app router (see about.html/page.tsx) so it can use the shared
 * Header/Footer components and the site's global typography.
 */

const PAGE_TITLE =
  "About TrueNorth Websites | Kelowna Web Design & Lead Recovery | Okanagan BC";
const PAGE_DESCRIPTION =
  "Meet the Kelowna web designer behind TrueNorth Websites. Helping Okanagan local businesses with web design, SEO, and AI-powered lead recovery.";
const OG_TITLE = "About TrueNorth Websites | Kelowna Web Design & Lead Recovery";
const OG_DESCRIPTION =
  "Meet the Kelowna web designer helping Okanagan local businesses stand out online.";
const CANONICAL_URL = "https://truenorthwebsites.com/about.html";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    locale: "en_CA",
    url: CANONICAL_URL,
  },
  twitter: {
    card: "summary",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About TrueNorth Websites",
  description:
    "Kelowna web design and lead recovery services for Okanagan local businesses.",
  url: CANONICAL_URL,
  mainEntity: {
    "@type": "LocalBusiness",
    name: "TrueNorth Websites",
    description:
      "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan local service businesses.",
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
};

export default function AboutLayout({
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
