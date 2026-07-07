import type { ReactNode } from "react";
import Link from "next/link";
import { format } from "date-fns";
import type { ValidatedFrontmatter } from "@/content/lib/mdx";

interface ArticleLayoutProps {
  children: ReactNode;
  frontmatter: ValidatedFrontmatter;
  readingTime?: number;
  backHref?: string;
  backLabel?: string;
}

/**
 * Professional article layout for MDX-driven pages.
 *
 * Provides a centered, readable reading column with breadcrumb navigation,
 * article meta (date, author, reading time), and a prose-optimized container
 * that styles every native Markdown element. Custom MDX shortcodes should
 * render with `not-prose` on their root element so their intentional styling
 * is preserved.
 */
export default function ArticleLayout({
  children,
  frontmatter,
  readingTime,
  backHref = "/resources/",
  backLabel = "Back to resources",
}: ArticleLayoutProps) {
  const publishedDate = frontmatter.datePublished
    ? new Date(frontmatter.datePublished)
    : null;

  return (
    <main className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <header className="mb-10 md:mb-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link
                  href={backHref}
                  className="hover:text-brand-teal transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="text-slate-700 truncate max-w-[12rem] md:max-w-md"
                aria-current="page"
                title={frontmatter.title}
              >
                {frontmatter.title}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            {publishedDate && (
              <time dateTime={frontmatter.datePublished}>
                {format(publishedDate, "MMMM d, yyyy")}
              </time>
            )}
            {frontmatter.author && (
              <>
                <span aria-hidden="true">·</span>
                <span>{frontmatter.author}</span>
              </>
            )}
            {typeof readingTime === "number" && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
        </header>

        <article className="prose prose-slate max-w-none">
          {children}
        </article>

        <footer className="mt-16 pt-10 border-t border-slate-200">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-teal transition-colors"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
        </footer>
      </div>
    </main>
  );
}
