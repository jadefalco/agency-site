import type { Metadata } from "next";
import { combineSchema } from "../lib/schema";

export const metadata: Metadata = {
  title:
    "Missed-Call Recovery for Trades | TrueNorth Websites | Kelowna & Okanagan",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Missed-Call Recovery for Trades | TrueNorth Websites",
    description:
      "Recover lost leads when you miss calls. Simple text-back system for Okanagan trades businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://truenorthwebsites.com/missed-call-recovery/",
  },
};

export default function MissedCallRecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaJson = JSON.stringify(combineSchema());

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
