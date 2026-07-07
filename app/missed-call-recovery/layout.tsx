import type { Metadata } from "next";
import { combineSchema } from "../lib/schema";
import { faqs } from "../sections/Faq";

export const metadata: Metadata = {
  title: "Missed-Call Recovery for Trades | Kelowna & Okanagan",
  description:
    "Recover lost leads when you miss calls. Simple text-back system for plumbers, electricians, HVAC & contractors in Kelowna & the Okanagan. Book a demo.",
  keywords: [
    "missed call recovery",
    "lead recovery",
    "trades business",
    "plumber",
    "electrician",
    "HVAC",
    "contractor",
    "Kelowna",
    "Okanagan",
  ],
  openGraph: {
    title: "Missed-Call Recovery for Trades | TrueNorth Websites",
    description:
      "Recover lost leads when you miss calls. Simple text-back system for Okanagan trades businesses.",
    type: "website",
    locale: "en_CA",
    siteName: "TrueNorth Websites",
    images: [
      {
        url: "/truenorth-logo.png",
        width: 1200,
        height: 630,
        alt: "TrueNorth Websites — Missed-Call Recovery for Okanagan Trades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missed-Call Recovery for Trades | TrueNorth Websites",
    description:
      "Recover lost leads when you miss calls. Simple text-back system for Okanagan trades businesses.",
    images: ["/truenorth-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://truenorthwebsites.com/missed-call-recovery",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function MissedCallRecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ...(JSON.parse(JSON.stringify(combineSchema()))["@graph"] || []),
      faqSchema,
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      {children}
    </>
  );
}
