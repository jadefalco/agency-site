import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import ArticleLayout from "@/app/components/ArticleLayout";
import {
  Callout,
  ComparisonTable,
  Cta,
  Faq,
  ImageBlock,
  ProsCons,
} from "@/app/components/mdx";
import { estimateReadingTime, getAllMdxSlugs, getMdxBySlug } from "@/content/lib/mdx";

/**
 * Dynamic route for MDX resource pages.
 *
 * Every .mdx file placed in /content/resources/ automatically becomes a page
 * at /resources/<slug>. The route uses generateStaticParams so pages are
 * pre-rendered at build time, generateMetadata for SEO, and @mdx-js/mdx to
 * render the MDX content with the project's existing shortcode components.
 */

const SITE_URL = "https://truenorthwebsites.com";

// Custom components available inside MDX resource files.
const mdxComponents = {
  Callout,
  ComparisonTable,
  Cta,
  Faq,
  ImageBlock,
  ProsCons,
};

interface Props {
  params: { slug: string };
}

/**
 * Pre-render every resource slug at build time.
 */
export async function generateStaticParams() {
  const slugs = getAllMdxSlugs("resources");
  return slugs.map((slug) => ({ slug }));
}

/**
 * Only allow statically generated slugs to be served.
 */
export const dynamicParams = false;

/**
 * Generate page metadata from MDX frontmatter.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  let data;
  try {
    data = getMdxBySlug("resources", slug);
  } catch {
    return {};
  }

  const { frontmatter } = data;
  const canonical = frontmatter.canonical || `${SITE_URL}/resources/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
    keywords: frontmatter.keywords,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      locale: "en_CA",
      url: canonical,
      siteName: "TrueNorth Websites",
      authors: frontmatter.author ? [frontmatter.author] : undefined,
      publishedTime: frontmatter.datePublished,
      modifiedTime: frontmatter.dateModified,
      images: frontmatter.ogImage
        ? [{ url: frontmatter.ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.ogImage ? [frontmatter.ogImage] : undefined,
    },
  };
}

/**
 * Render the MDX resource page.
 */
export default async function ResourcePage({ params }: Props) {
  const { slug } = params;

  let data;
  try {
    data = getMdxBySlug("resources", slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = data;
  const canonical = frontmatter.canonical || `${SITE_URL}/resources/${slug}`;
  const readingTime = estimateReadingTime(content);

  // Compile MDX to a function body and execute it with React's JSX runtime.
  // This happens at build time because generateStaticParams pre-renders pages.
  const compiled = String(
    await compile(content, {
      outputFormat: "function-body",
      development: false,
    })
  );
  const { default: MDXContent } = await run(compiled, runtime);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    url: canonical,
    author: frontmatter.author
      ? { "@type": "Organization", name: frontmatter.author }
      : undefined,
    publisher: { "@type": "Organization", name: "TrueNorth Websites" },
    datePublished: frontmatter.datePublished,
    dateModified: frontmatter.dateModified || frontmatter.datePublished,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleLayout frontmatter={frontmatter} readingTime={readingTime}>
        <MDXContent components={mdxComponents} />
      </ArticleLayout>
    </>
  );
}
