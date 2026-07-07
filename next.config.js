const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable MDX pages and imports across the App Router.
  // This is required for the MDX content system. Existing pages are unaffected.
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
