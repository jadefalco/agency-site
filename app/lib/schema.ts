export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TrueNorth Websites",
  description:
    "Kelowna web design and lead recovery solutions for local service businesses throughout the Okanagan.",
  url: "https://truenorthwebsites.com",
  email: "websitestruenorth@gmail.com",
  areaServed: [
    { "@type": "City", name: "Kelowna" },
    { "@type": "City", name: "West Kelowna" },
    { "@type": "City", name: "Vernon" },
    { "@type": "City", name: "Penticton" },
    { "@type": "City", name: "Lake Country" },
    { "@type": "City", name: "Peachland" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kelowna",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  sameAs: ["https://truenorthwebsites.com"],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Missed-Call Recovery System",
  description:
    "A text-back system that helps trades businesses recover leads when they miss customer calls.",
  provider: {
    "@type": "LocalBusiness",
    name: "TrueNorth Websites",
  },
  areaServed: {
    "@type": "Place",
    name: "Okanagan Valley",
  },
  serviceType: "Lead Recovery",
  audience: {
    "@type": "Audience",
    audienceType:
      "Plumbers, electricians, HVAC technicians, roofers, landscapers, and local contractors",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TrueNorth Websites",
  url: "https://truenorthwebsites.com",
};

export const combineSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema, serviceSchema, websiteSchema],
  };
};
