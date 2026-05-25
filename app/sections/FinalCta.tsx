"use client";

import { useState, FormEvent } from "react";

export default function FinalCta() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    best_time: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", business: "", phone: "", best_time: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-brand-dark py-16 md:py-24"
      style={{
        background:
          "radial-gradient(circle at 15% 50%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="max-w-xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-3">
            See If It Fits Your Business
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            Tell us a bit about your trade and we&apos;ll set up a quick 15-minute
            demo. No pressure, no pitch.
          </p>
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="bg-brand-teal/10 border border-brand-teal/30 rounded-2xl p-8 md:p-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-teal/20 text-brand-teal-300 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Message Sent</h3>
            <p className="text-white/65 text-sm leading-relaxed">
              Thanks — we&apos;ll be in touch within 24 hours to schedule your demo.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-5 text-brand-teal-300 text-sm font-medium hover:underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
            aria-label="Book a demo"
          >
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="Your Name"
                  type="text"
                  name="name"
                  placeholder="Mike Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Business Name"
                  type="text"
                  name="business"
                  placeholder="Smith Plumbing"
                  value={formData.business}
                  onChange={handleChange}
                  required
                />
              </div>
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                placeholder="(250) 555-0199"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <div>
                <label
                  htmlFor="best_time"
                  className="block text-white/70 text-sm font-medium mb-1.5"
                >
                  Best Time To Call
                </label>
                <select
                  id="best_time"
                  name="best_time"
                  value={formData.best_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="" className="bg-brand-dark text-white/50">
                    Select a time...
                  </option>
                  <option value="morning" className="bg-brand-dark text-white">
                    Morning (8am – 12pm)
                  </option>
                  <option value="afternoon" className="bg-brand-dark text-white">
                    Afternoon (12pm – 5pm)
                  </option>
                  <option value="evening" className="bg-brand-dark text-white">
                    Evening (5pm – 8pm)
                  </option>
                </select>
              </div>
            </div>

            {status === "error" && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-6 px-6 py-3.5 rounded-full bg-brand-teal text-white font-semibold text-[0.95rem] transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Book My Demo"
              )}
            </button>

            <p className="text-center text-white/40 text-xs mt-4">
              No pressure. Just a quick demo to see if it fits your business.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-white/70 text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-brand-teal ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors"
      />
    </div>
  );
}
