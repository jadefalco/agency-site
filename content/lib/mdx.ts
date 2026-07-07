import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * SEO frontmatter fields supported by the MDX content system.
 *
 * This is the contract every MDX file in /content should follow. A future
 * dynamic route can read these values to generate page metadata, canonical
 * URLs, Open Graph tags, sitemap entries, and JSON-LD structured data.
 */
export interface SEOFrontmatter {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: string;
  ogImage?: string;
  schemaType?: "Article" | "Service" | "LocalBusiness" | "FAQPage" | "WebPage";
  priority?: number;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

/**
 * Zod schema for runtime validation of MDX frontmatter.
 * Keeps content authors honest and gives clear errors at build time.
 */
export const frontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  canonical: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
  datePublished: z.string().date().optional(),
  dateModified: z.string().date().optional(),
  author: z.string().optional(),
  ogImage: z.string().optional(),
  schemaType: z
    .enum(["Article", "Service", "LocalBusiness", "FAQPage", "WebPage"])
    .optional(),
  priority: z.number().min(0).max(1).optional(),
  changeFrequency: z
    .enum([
      "always",
      "hourly",
      "daily",
      "weekly",
      "monthly",
      "yearly",
      "never",
    ])
    .optional(),
});

/**
 * Validated frontmatter type derived from the Zod schema.
 */
export type ValidatedFrontmatter = z.infer<typeof frontmatterSchema>;

/**
 * Content subdirectories that the MDX system supports.
 */
export type ContentFolder = "resources" | "services" | "portfolio";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Resolve the absolute path to a content folder.
 */
function folderPath(folder: ContentFolder): string {
  return path.join(CONTENT_ROOT, folder);
}

/**
 * List every slug (filename without .mdx) inside a content folder.
 *
 * Example:
 *   const slugs = getAllMdxSlugs("resources");
 *   // -> ["how-much-does-a-website-cost", "choosing-a-designer"]
 */
export function getAllMdxSlugs(folder: ContentFolder): string[] {
  const dir = folderPath(folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));
}

/**
 * Read a single MDX file and return its frontmatter plus raw content.
 *
 * Example:
 *   const { frontmatter, content } = getMdxBySlug("resources", "my-guide");
 */
export function getMdxBySlug(folder: ContentFolder, slug: string) {
  const filePath = path.join(folderPath(folder), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);

  return {
    slug,
    frontmatter: parseFrontmatter(parsed.data),
    content: parsed.content,
  };
}

/**
 * Validate raw frontmatter with Zod and return a typed object.
 */
export function parseFrontmatter(data: unknown): ValidatedFrontmatter {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(`Invalid MDX frontmatter:\n${issues.join("\n")}`);
  }
  return result.data;
}

/**
 * Read every MDX file in a folder and return validated frontmatter.
 *
 * Useful for building index pages, sitemaps, or related-content lists.
 */
export function getAllMdxFrontmatter(folder: ContentFolder) {
  const slugs = getAllMdxSlugs(folder);
  return slugs.map((slug) => {
    const { frontmatter } = getMdxBySlug(folder, slug);
    return { slug, frontmatter };
  });
}

/**
 * Estimate reading time in minutes for a given MDX content string.
 *
 * Assumes an average reading speed of 200 words per minute.
 */
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
