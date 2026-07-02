import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

/**
 * Root layout with global fallback metadata.
 *
 * Every page can override these values via its own Metadata export. The
 * defaults ensure that no route ships without a title, description, canonical
 * base, Open Graph, or Twitter card tags.
 */

const SITE_URL = "https://truenorthwebsites.com";
const DEFAULT_TITLE = "TrueNorth Websites | Kelowna Web Design, SEO & Lead Recovery";
const DEFAULT_DESCRIPTION =
  "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan businesses. High-converting websites that generate more calls, bookings, and customers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | TrueNorth Websites",
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: "TrueNorth Websites",
    images: [
      {
        url: "/truenorth-logo.png",
        width: 1200,
        height: 630,
        alt: "TrueNorth Websites — Kelowna Web Design, SEO & Lead Recovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/truenorth-logo.png"],
  },
  icons: {
    icon: { url: "/favicon.ico?v=2", sizes: "any" },
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
