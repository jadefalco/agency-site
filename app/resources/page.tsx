import type { Metadata } from "next";
import Link from "next/link";
import {
  estimateReadingTime,
  getAllMdxSlugs,
  getMdxBySlug,
} from "@/content/lib/mdx";
import Header from "@/app/sections/Header";
import Footer from "@/app/sections/Footer";

/**
 * Automatic /resources index page.
 *
 * This page discovers every .mdx file in /content/resources/, sorts them by
 * publication date (newest first), and renders a card for each article.
 * Future resource pages will appear here automatically after a build.
 */

const SITE_URL = "https://truenorthwebsites.com";
const PAGE_TITLE = "Resources | TrueNorth Websites";
const PAGE_DESCRIPTION =
  "Free guides and practical advice for Okanagan business owners who want a better website and more customers.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/resources`,
    siteName: "TrueNorth Websites",
    images: [
      {
        url: "/truenorth-logo.png",
        width: 1200,
        height: 630,
        alt: "TrueNorth Websites Resources",
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

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ResourcesIndexPage() {
  const resources = getAllMdxSlugs("resources")
    .map((slug) => {
      const { frontmatter, content } = getMdxBySlug("resources", slug);
      return {
        slug,
        frontmatter,
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => {
      const dateA = a.frontmatter.datePublished || "";
      const dateB = b.frontmatter.datePublished || "";
      return dateB.localeCompare(dateA);
    });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: resources.map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/resources/${resource.slug}`,
      name: resource.frontmatter.title,
      description: resource.frontmatter.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Header solid />
      <main className="relative bg-brand-slate pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h1 className="font-serif text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] tracking-[-0.02em] mb-4">
              Resources
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Free guides and practical advice for Okanagan business owners who
              want a better website and more customers.
            </p>
          </div>

          {/* Cards */}
          {resources.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">
                No resources yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {resources.map((resource) => (
                <article
                  key={resource.slug}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300/80 flex flex-col"
                >
                  <h2 className="text-brand-dark text-lg md:text-xl font-bold mb-3">
                    {resource.frontmatter.title}
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 flex-1">
                    {resource.frontmatter.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-5">
                    {resource.frontmatter.datePublished && (
                      <time dateTime={resource.frontmatter.datePublished}>
                        {formatDate(resource.frontmatter.datePublished)}
                      </time>
                    )}
                    <span>·</span>
                    <span>{resource.readingTime} min read</span>
                  </div>

                  <Link
                    href={`/resources/${resource.slug}/`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-white text-sm font-semibold transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm w-full"
                  >
                    Read Guide
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
