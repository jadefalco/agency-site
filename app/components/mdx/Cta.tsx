import Link from "next/link";

interface CtaProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

/**
 * Call-to-action section for MDX content.
 *
 * Usage in MDX:
 *   <Cta
 *     title="Ready to get started?"
 *     description="Book a free consultation today."
 *     buttonText="Book a Call"
 *     href="/#contact"
 *   />
 */
export default function Cta({
  title = "Ready to grow your business?",
  description = "Get a free mockup and see what your website could look like.",
  buttonText = "Get Free Mockup",
  href = "/#contact",
}: CtaProps) {
  return (
    <section className="not-prose my-8 md:my-10 rounded-2xl bg-brand-dark p-6 md:p-10 text-center text-white">
      <h2 className="font-serif text-2xl md:text-3xl mb-3">{title}</h2>
      <p className="text-white/75 max-w-xl mx-auto mb-6 text-sm md:text-base leading-relaxed">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-white text-sm font-semibold transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm"
      >
        {buttonText}
      </Link>
    </section>
  );
}
