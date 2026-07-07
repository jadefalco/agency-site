import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",
          "dark-light": "#1e293b",
          accent: "#0ea5e9",
          teal: "#14b8a6",
          "teal-100": "#ccfbf1",
          "teal-300": "#5eead4",
          slate: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "bubble-in": "bubbleIn 0.4s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bubbleIn: {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      typography: ({
        theme,
      }: {
        theme: (key: string, defaultValue?: unknown) => unknown;
      }) => {
        const joinFonts = (key: string): string => {
          const value = theme(key);
          return Array.isArray(value) ? value.join(", ") : String(value);
        };

        return {
          DEFAULT: {
            css: {
              "--tw-prose-body": theme("colors.slate.600"),
              "--tw-prose-headings": theme("colors.brand.dark"),
              "--tw-prose-lead": theme("colors.slate.600"),
              "--tw-prose-links": theme("colors.brand.teal"),
              "--tw-prose-bold": theme("colors.brand.dark"),
              "--tw-prose-counters": theme("colors.slate.500"),
              "--tw-prose-bullets": theme("colors.brand.teal"),
              "--tw-prose-hr": theme("colors.slate.200"),
              "--tw-prose-quotes": theme("colors.brand.dark"),
              "--tw-prose-quote-borders": theme("colors.brand.teal"),
              "--tw-prose-captions": theme("colors.slate.500"),
              "--tw-prose-code": theme("colors.brand.dark"),
              "--tw-prose-pre-code": theme("colors.slate.200"),
              "--tw-prose-pre-bg": theme("colors.brand.dark"),
              "--tw-prose-th-borders": theme("colors.slate.200"),
              "--tw-prose-td-borders": theme("colors.slate.100"),
              maxWidth: "none",
              fontSize: "1.0625rem",
              lineHeight: "1.75",
              h1: {
                fontFamily: joinFonts("fontFamily.serif"),
                fontWeight: "700",
                letterSpacing: "-0.025em",
                lineHeight: "1.1",
              },
              h2: {
                fontFamily: joinFonts("fontFamily.serif"),
                fontWeight: "700",
                letterSpacing: "-0.025em",
                lineHeight: "1.2",
                marginTop: "2.5em",
              },
              h3: {
                fontFamily: joinFonts("fontFamily.serif"),
                fontWeight: "700",
                letterSpacing: "-0.02em",
                lineHeight: "1.25",
                marginTop: "2em",
              },
              h4: {
                fontFamily: joinFonts("fontFamily.sans"),
                fontWeight: "700",
                lineHeight: "1.3",
                marginTop: "1.75em",
              },
              "h1 + *, h2 + *, h3 + *, h4 + *": {
                marginTop: "0",
              },
              p: {
                marginTop: "0",
                marginBottom: "1.5em",
              },
              a: {
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 150ms ease",
              },
              "a:hover": {
                color: theme("colors.teal.600"),
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              },
              blockquote: {
                fontStyle: "italic",
                fontWeight: "500",
                borderInlineStartWidth: "4px",
                borderRadius: "0 0.75rem 0.75rem 0",
                backgroundColor: theme("colors.slate.50"),
                padding: "1.25rem 1.5rem",
              },
              "blockquote p:first-of-type::before": {
                content: "none",
              },
              "blockquote p:last-of-type::after": {
                content: "none",
              },
              code: {
                fontWeight: "500",
                padding: "0.125rem 0.375rem",
                borderRadius: "0.375rem",
              },
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
              pre: {
                borderRadius: "0.75rem",
                padding: "1.25rem",
              },
              "pre code": {
                padding: "0",
                backgroundColor: "transparent",
              },
              img: {
                borderRadius: "1rem",
                borderWidth: "1px",
                borderColor: theme("colors.slate.200"),
                boxShadow: theme("boxShadow.sm"),
              },
              "figure img": {
                marginBottom: "0.75rem",
              },
              figcaption: {
                textAlign: "center",
                fontSize: "0.875rem",
              },
              hr: {
                marginTop: "2.5em",
                marginBottom: "2.5em",
              },
              "ul > li, ol > li": {
                marginTop: "0.375em",
                marginBottom: "0.375em",
              },
              "ul > li::marker, ol > li::marker": {
                color: theme("colors.brand.teal"),
              },
              table: {
                fontSize: "0.9375rem",
              },
              "thead th": {
                fontWeight: "700",
                color: theme("colors.brand.dark"),
              },
            },
          },
        };
      },
    },
  },
  plugins: [typography],
};

export default config;
