import Link from "next/link";

interface Guide {
  title: string;
  description: string;
  href?: string;
  buttonText: string;
  comingSoon?: boolean;
}

const guides: Guide[] = [
  {
    title: "How Much Does a Website Cost in Kelowna?",
    description:
      "Typical pricing, what affects the cost, and how to compare quotes before you hire a designer.",
    href: "/kelowna-web-design/",
    buttonText: "Read Guide",
  },
  {
    title: "How to Choose a Web Designer in Kelowna",
    description:
      "The questions every business owner should ask before hiring a freelancer or agency.",
    href: "/resources/choosing-a-web-designer/",
    buttonText: "Read Guide",
  },
];

/**
 * Helpful Guides section for the homepage.
 *
 * Displays responsive cards linking to practical guides for Okanagan
 * business owners. Built as a reusable Server Component with zero
 * client-side JavaScript.
 */
export default function HelpfulGuides() {
  return (
    <section className="relative bg-brand-slate py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="font-serif text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            Helpful Guides
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Free, practical advice for Okanagan business owners who want a
            better website and more customers.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {guides.map((guide) => (
            <article
              key={guide.title}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300/80 flex flex-col"
            >
              <h3 className="text-brand-dark text-lg md:text-xl font-bold mb-3">
                {guide.title}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 flex-1">
                {guide.description}
              </p>

              {guide.href && !guide.comingSoon ? (
                <Link
                  href={guide.href}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-white text-sm font-semibold transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm w-full sm:w-auto"
                >
                  {guide.buttonText}
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-200 text-slate-500 text-sm font-semibold cursor-not-allowed w-full sm:w-auto">
                  {guide.buttonText}
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
