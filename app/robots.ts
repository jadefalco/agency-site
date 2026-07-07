import type { MetadataRoute } from "next";

/**
 * robots.txt generated with the Next.js MetadataRoute API.
 *
 * Next.js serves this file at /robots.txt automatically.
 * The sitemap reference tells crawlers where to find the auto-generated
 * sitemap.xml at the production domain.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://truenorthwebsites.com/sitemap.xml",
  };
}
