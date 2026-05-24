// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Terra Cut Supply | Premium Heavy Equipment Parts",
  description: "Rubber tracks, attachments, and undercarriage parts for excavators, skid steers, and loaders. Fast quotes, competitive pricing, reliable supply.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "TERRA CUT",
  menuLinks: [
    { label: "Shop", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Linkedin", label: "LinkedIn", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
  ],
  searchPlaceholder: "Search parts...",
  cartEmptyText: "Your quote request is empty",
  cartCheckoutText: "Submit Quote Request",
  continueShoppingText: "Continue Shopping",
  menuBackgroundImage: "images/hero-excavator.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "FAMILY-RUN SUPPLIER • 15+ YEARS",
  title: "PREMIUM HEAVY\nEQUIPMENT PARTS\nYOU CAN RELY ON",
  ctaPrimaryText: "Request a Quote",
  ctaPrimaryTarget: "#contact",
  ctaSecondaryText: "Browse Parts",
  ctaSecondaryTarget: "#products",
  backgroundImage: "images/hero-excavator.jpg",
};

// ─── SubHero (Featured Category - Rubber Tracks) ─────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "BEST SELLER",
  heading: "Rubber Tracks",
  bodyParagraphs: [
    "High-traction, long-life tracks built for mud, gravel, and demolition sites. Fits most major makes and models with fast turnaround.",
    "Our rubber tracks are engineered for maximum durability in the toughest conditions, helping you minimize downtime and keep your fleet moving."
  ],
  linkText: "See compatible machines",
  linkTarget: "#machine-types",
  image1: "images/featured-rubber-track.jpg",
  image2: "images/product-rubber-track.jpg",
  stats: [
    { value: 500, suffix: "+", label: "Track Sizes" },
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 4, suffix: "h", label: "Avg Quote Time" },
  ],
};

// ─── Video Section (Smart Search) ────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "PARTS FINDER",
  heading: "Find parts in seconds",
  bodyParagraphs: [
    "Search by part name, number, machine type, or brand. Our extensive inventory covers all major manufacturers.",
    "Popular: Rubber Tracks • Buckets • Undercarriage • Idlers • Rollers"
  ],
  ctaText: "Search Parts",
  ctaTarget: "#products",
  backgroundImage: "images/search-yard.jpg",
};

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  compatibility: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "SHOP",
  heading: "Best sellers",
  description: "Quality parts that keep your machines running. All products backed by our reliability guarantee.",
  viewAllText: "View all parts",
  addToCartText: "Request Quote",
  addedToCartText: "Added to Quote",
  categories: ["All", "Rubber Tracks", "Attachments", "Undercarriage", "Wear Parts"],
  products: [
    { 
      id: 1, 
      name: "Rubber Track 300×52.5W", 
      price: 0, 
      category: "Rubber Tracks", 
      image: "images/product-rubber-track.jpg",
      compatibility: "CAT, Kubota"
    },
    { 
      id: 2, 
      name: "Heavy-Duty Bucket 24″", 
      price: 0, 
      category: "Attachments", 
      image: "images/product-bucket.jpg",
      compatibility: "John Deere"
    },
    { 
      id: 3, 
      name: "Idler Roller Assembly", 
      price: 0, 
      category: "Undercarriage", 
      image: "images/product-idler.jpg",
      compatibility: "Komatsu"
    },
    { 
      id: 4, 
      name: "Steel Track Link Set", 
      price: 0, 
      category: "Rubber Tracks", 
      image: "images/product-steel-track.jpg",
      compatibility: "CAT"
    },
    { 
      id: 5, 
      name: "Quick Attach Coupler", 
      price: 0, 
      category: "Attachments", 
      image: "images/product-coupler.jpg",
      compatibility: "Bobcat, CAT"
    },
    { 
      id: 6, 
      name: "Bottom Roller", 
      price: 0, 
      category: "Undercarriage", 
      image: "images/product-roller.jpg",
      compatibility: "Yanmar, Kubota"
    },
  ],
};

// ─── Machine Types ───────────────────────────────────────────────────────────

export interface MachineType {
  id: number;
  name: string;
  image: string;
}

export interface MachineTypesConfig {
  tag: string;
  heading: string;
  machineTypes: MachineType[];
  backgroundImage: string;
}

export const machineTypesConfig: MachineTypesConfig = {
  tag: "BROWSE",
  heading: "Find parts\nby machine type",
  machineTypes: [
    { id: 1, name: "Excavators", image: "images/machine-excavator.jpg" },
    { id: 2, name: "Skid Steers", image: "images/machine-skidsteer.jpg" },
    { id: 3, name: "Loaders", image: "images/machine-loader.jpg" },
    { id: 4, name: "Compact Track Loaders", image: "images/machine-ctl.jpg" },
  ],
  backgroundImage: "images/machine-types-bg.jpg",
};

// ─── Brands ──────────────────────────────────────────────────────────────────

export interface Brand {
  id: number;
  name: string;
}

export interface BrandsConfig {
  tag: string;
  heading: string;
  subhead: string;
  brands: Brand[];
}

export const brandsConfig: BrandsConfig = {
  tag: "COMPATIBILITY",
  heading: "Parts for every major brand",
  subhead: "If you run it, we support it—fast quotes, reliable availability.",
  brands: [
    { id: 1, name: "CAT" },
    { id: 2, name: "John Deere" },
    { id: 3, name: "Komatsu" },
    { id: 4, name: "Kubota" },
    { id: 5, name: "Bobcat" },
    { id: 6, name: "Yanmar" },
  ],
};

// ─── Features (Why Choose Us) ────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Wrench" | "Clock";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  tag: string;
  heading: string;
  subhead: string;
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  tag: "WHY TERRA CUT",
  heading: "Built for contractors",
  subhead: "We keep your machines moving with competitive pricing, fast sourcing, and parts that hold up under real job site conditions.",
  features: [
    { 
      icon: "Clock", 
      title: "Fast Sourcing", 
      description: "Most quotes within 4 hours; stocked items ship fast." 
    },
    { 
      icon: "ShieldCheck", 
      title: "Competitive Pricing", 
      description: "Volume discounts and fair rates on every order." 
    },
    { 
      icon: "Wrench", 
      title: "Industry Expertise", 
      description: "15+ years matching machines to the right parts." 
    },
    { 
      icon: "Truck", 
      title: "Reliable Supply", 
      description: "Trusted network of manufacturers and distributors." 
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "",
  heading: "",
  viewAllText: "",
  readMoreText: "",
  posts: [],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "",
  heading: "",
  ctaText: "",
  ctaTarget: "",
  faqs: [],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [],
};

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface TestimonialConfig {
  quote: string;
  attribution: string;
  backgroundImage: string;
}

export const testimonialConfig: TestimonialConfig = {
  quote: "Terra Cut turned a 3-day hunt into a same-day solution. Reliable, fast, and they actually know machines.",
  attribution: "Marcus Reid, Fleet Manager",
  backgroundImage: "images/testimonial-bg.jpg",
};

// ─── Final CTA ───────────────────────────────────────────────────────────────

export interface FinalCTAConfig {
  heading: string;
  subhead: string;
  ctaText: string;
  trustLine: string;
  backgroundImage: string;
}

export const finalCTAConfig: FinalCTAConfig = {
  heading: "Need a part fast?\nGet a quote today.",
  subhead: "Tell us what you're running and what you need. We'll respond with pricing and availability.",
  ctaText: "Request a Quote",
  trustLine: "Typical response time: under 4 hours",
  backgroundImage: "images/cta-yard.jpg",
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Get in Touch",
  description: "Have questions about a part? Need a custom quote? Our team is ready to help.",
  locationLabel: "Location",
  location: "Kelowna, BC",
  emailLabel: "Email",
  email: "sales@terracutsupply.com",
  phoneLabel: "Phone",
  phone: "1-800-561-5414",
  formFields: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us what part you need...",
  },
  submitText: "Request Quote",
  submittingText: "Sending...",
  submittedText: "Quote Requested",
  successMessage: "Thanks! We'll get back to you within 4 hours.",
  backgroundImage: "images/cta-yard.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "TERRA CUT",
  brandDescription: "Premium parts. Reliable supply. Less downtime.",
  newsletterHeading: "Stay Updated",
  newsletterDescription: "Get restock alerts and seasonal specials.",
  newsletterPlaceholder: "Email address",
  newsletterButtonText: "Subscribe",
  newsletterSuccessText: "Thanks for subscribing!",
  linkGroups: [
    {
      title: "Shop",
      links: [
        { label: "Rubber Tracks", href: "#" },
        { label: "Attachments", href: "#" },
        { label: "Undercarriage", href: "#" },
        { label: "Wear Parts", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Contact", href: "#contact" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Shipping", href: "#" },
        { label: "Returns", href: "#" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightText: "© 2026 Terra Cut Supply. All rights reserved.",
  socialLinks: [
    { icon: "Linkedin", label: "LinkedIn", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
  ],
};
