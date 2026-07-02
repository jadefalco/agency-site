import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

/**
 * Fully automatic sitemap for the App Router + public static HTML pages.
 *
 * This function scans:
 *   - app subdirectories containing page.tsx -> public App Router routes
 *   - public subdirectories containing .html files -> static HTML files served from the public directory
 *
 * Non-indexable paths (admin, API routes, thank-you pages, drafts, build
 * artifacts, and node_modules) are excluded by the deny-lists below.
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

// Public-directory patterns that should never appear in the sitemap.
const PUBLIC_DENY_PATTERNS = [
  /node_modules/,
  /\/dist\//,
  /3rd-time/,
  /Riviera-grok/,
  /thank-you\.html$/,
];

function isAppRouteAllowed(route: string): boolean {
  return !APP_DENY_PATTERNS.some((pattern) => pattern.test(route));
}

function isPublicPathAllowed(filePath: string): boolean {
  return !PUBLIC_DENY_PATTERNS.some((pattern) => pattern.test(filePath));
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
  return 0.8;
}

function getChangeFrequency(route: string): "weekly" | "monthly" {
  if (route === "/" || route === "/missed-call-recovery" || route === "/kelowna-web-design") {
    return "weekly";
  }
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");
  const publicDir = path.join(process.cwd(), "public");

  const appRoutes = discoverAppRoutes(appDir, appDir);
  const publicRoutes = discoverPublicHtml(publicDir);

  // Deduplicate by route (App Router wins if a route exists in both).
  const routeMap = new Map<string, string>();
  for (const { route, filePath } of [...publicRoutes, ...appRoutes]) {
    routeMap.set(route, filePath);
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];
  routeMap.forEach((filePath, route) => {
    // Static files keep their extension; App Router routes use trailing slash
    // to match the canonical URLs declared in page metadata.
    const url =
      route === "/"
        ? `${SITE_URL}/`
        : route.endsWith(".html")
          ? `${SITE_URL}${route}`
          : `${SITE_URL}${route}/`;
    sitemapEntries.push({
      url,
      lastModified: fileMtime(filePath),
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    });
  });

  // Sort for a stable, predictable sitemap.
  sitemapEntries.sort((a, b) => String(a.url).localeCompare(String(b.url)));

  return sitemapEntries;
}
