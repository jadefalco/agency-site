import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllMdxFrontmatter } from "../content/lib/mdx";

/**
 * Fully automatic sitemap for the App Router + public static HTML pages.
 *
 * This function scans:
 *   - app subdirectories containing page.tsx -> public App Router routes
 *   - public subdirectories containing .html files -> static HTML files served from the public directory
 *
 * App Router routes are excluded via a deny-list (APP_DENY_PATTERNS) since
 * every route under /app is a deliberate, real page of the site.
 *
 * Static HTML files under /public are handled the opposite way, via an
 * ALLOW-list (PUBLIC_ALLOW_PATTERNS): only files explicitly named there are
 * treated as real TrueNorth Websites pages. Everything else under /public —
 * client demo/portfolio previews, build artifacts, or anything dropped in
 * later — is excluded by default, so a new demo folder can never end up in
 * the sitemap just because nobody remembered to block it by name.
 *
 * The exported function returns a MetadataRoute.Sitemap array that Next.js
 * serves at /sitemap.xml automatically on build and on Vercel.
 */

const SITE_URL = "https://truenorthwebsites.com";

// App Router patterns that should never appear in the sitemap.
const APP_DENY_PATTERNS = [
  /^api\//,
  /^admin\//,
  /^_/, // private layout/error helpers if any
];

// Public-directory HTML files that ARE real TrueNorth Websites pages and may
// appear in the sitemap. Everything else under /public is excluded by
// default — including client demo/portfolio previews (e.g. 3rd-time/,
// Riviera-grok/, portfolio/*) and utility pages intentionally kept out of
// search (thank-you.html already carries its own noindex meta tag).
const PUBLIC_ALLOW_PATTERNS = [/^about\.html$/];

function isAppRouteAllowed(route: string): boolean {
  if (APP_DENY_PATTERNS.some((pattern) => pattern.test(route))) return false;
  // Exclude literal dynamic route placeholders like /resources/[slug].
  if (route.includes("[")) return false;
  return true;
}

function isPublicPathAllowed(filePath: string): boolean {
  return PUBLIC_ALLOW_PATTERNS.some((pattern) => pattern.test(filePath));
}

function fileMtime(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

function discoverAppRoutes(dir: string, baseDir: string): { route: string; filePath: string }[] {
  const entries: { route: string; filePath: string }[] = [];

  function walk(current: string) {
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(current, item.name);
      if (item.isDirectory()) {
        walk(fullPath);
      } else if (item.name === "page.tsx" || item.name === "page.ts") {
        const relative = path.relative(baseDir, fullPath);
        const normalized = relative.replace(/\\/g, "/");
        const routeDir = path.dirname(normalized);
        const route = routeDir === "." ? "/" : `/${routeDir}`;
        if (isAppRouteAllowed(routeDir)) {
          entries.push({ route, filePath: fullPath });
        }
      }
    }
  }

  walk(dir);
  return entries;
}

function discoverPublicHtml(publicDir: string): { route: string; filePath: string }[] {
  const entries: { route: string; filePath: string }[] = [];

  function walk(current: string) {
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(current, item.name);
      if (item.isDirectory()) {
        walk(fullPath);
      } else if (item.name.endsWith(".html")) {
        const relative = path.relative(publicDir, fullPath).replace(/\\/g, "/");
        if (!isPublicPathAllowed(relative)) continue;

        const dir = path.dirname(relative);
        const route =
          item.name === "index.html"
            ? dir === "."
              ? "/"
              : `/${dir}`
            : `/${relative}`;

        entries.push({ route, filePath: fullPath });
      }
    }
  }

  walk(publicDir);
  return entries;
}

function getPriority(route: string): number {
  if (route === "/") return 1.0;
  if (route === "/missed-call-recovery" || route === "/kelowna-web-design") return 0.9;
  if (route.startsWith("/resources/")) return 0.8;
  return 0.8;
}

function getChangeFrequency(route: string): ChangeFrequency {
  if (route === "/" || route === "/missed-call-recovery" || route === "/kelowna-web-design") {
    return "weekly";
  }
  if (route.startsWith("/resources/")) return "monthly";
  return "monthly";
}

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function discoverMdxResourceRoutes(): {
  route: string;
  filePath: string;
  lastModified: Date;
  priority: number;
  changeFrequency: ChangeFrequency;
}[] {
  const entries: {
    route: string;
    filePath: string;
    lastModified: Date;
    priority: number;
    changeFrequency: ChangeFrequency;
  }[] = [];

  try {
    const resources = getAllMdxFrontmatter("resources");
    for (const { slug, frontmatter } of resources) {
      const filePath = path.join(process.cwd(), "content", "resources", `${slug}.mdx`);
      const lastModified = frontmatter.dateModified
        ? new Date(frontmatter.dateModified)
        : fileMtime(filePath);
      entries.push({
        route: `/resources/${slug}`,
        filePath,
        lastModified,
        priority: frontmatter.priority ?? 0.8,
        changeFrequency: frontmatter.changeFrequency ?? "monthly",
      });
    }
  } catch {
    // If the resources folder is empty or missing, return no entries.
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");
  const publicDir = path.join(process.cwd(), "public");

  const appRoutes = discoverAppRoutes(appDir, appDir);
  const publicRoutes = discoverPublicHtml(publicDir);
  const resourceRoutes = discoverMdxResourceRoutes();

  // Deduplicate by route (App Router wins if a route exists in both).
  const routeMap = new Map<string, string>();
  for (const { route, filePath } of [...publicRoutes, ...appRoutes]) {
    routeMap.set(route, filePath);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];
  routeMap.forEach((filePath, route) => {
    // Every discovered route is already a bare path with no trailing slash
    // (public HTML files keep their own extension; App Router routes are
    // plain paths), so the URL is just the site origin plus the route —
    // matching Next.js's default trailingSlash:false behavior and the
    // canonical URLs declared in page metadata.
    const url = `${SITE_URL}${route}`;
    sitemapEntries.push({
      url,
      lastModified: fileMtime(filePath),
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    });
  });

  // Add MDX resource routes discovered from /content/resources/.
  for (const {
    route,
    lastModified,
    priority,
    changeFrequency,
  } of resourceRoutes) {
    sitemapEntries.push({
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency,
      priority,
    });
  }

  // Sort for a stable, predictable sitemap.
  sitemapEntries.sort((a, b) => String(a.url).localeCompare(String(b.url)));

  return sitemapEntries;
}
