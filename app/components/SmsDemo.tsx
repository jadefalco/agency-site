"use client";

import { useEffect, useState } from "react";

const issueOptions = [
  "1. Emergency leak",
  "2. Hot water tank",
  "3. Drain issue",
  "4. Quote request",
];

const locationOptions = [
  "1. Rutland",
  "2. Lower Mission",
  "3. Glenmore",
  "4. West Kelowna",
  "5. Other",
];

export default function SmsDemo() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-[340px] md:max-w-[320px]"
      aria-label="Demo of a missed-call text conversation"
    >
      {/* Phone frame */}
      <div className="relative bg-brand-dark rounded-[1.5rem] p-2.5 shadow-2xl shadow-black/40 border border-slate-700/50">
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-2">
          <span className="text-[0.6rem] text-slate-400 font-medium">9:41</span>
          <div className="flex gap-1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Missed call banner */}
        <div
          className={`mx-1.5 mb-2.5 transition-all duration-500 ${
            started ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="bg-slate-800/80 rounded-lg px-3 py-2 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <PhoneMissedIcon />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold">Missed Call</p>
              <p className="text-slate-400 text-[0.65rem] truncate">(250) 555-0199</p>
            </div>
            <span className="text-slate-500 text-[0.6rem] ml-auto shrink-0">Now</span>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-2 px-1.5 pb-3">
          {/* Business message 1 */}
          <Bubble side="right" delay={500} started={started}>
            <p className="text-[0.78rem] leading-snug">
              Hi — thanks for calling ABC Plumbing. We&apos;re likely on a job
              site right now. What can we help with?
            </p>
            <div className="mt-1.5 space-y-[3px]">
              {issueOptions.map((opt) => (
                <OptionPill key={opt}>{opt}</OptionPill>
              ))}
            </div>
          </Bubble>

          {/* Customer reply 1 */}
          <Bubble side="left" delay={1200} started={started} narrow>
            <p className="text-[0.78rem]">1</p>
          </Bubble>

          {/* Business message 2 — location */}
          <Bubble side="right" delay={1800} started={started}>
            <p className="text-[0.78rem] leading-snug">
              Thanks — what area are you in?
            </p>
            <div className="mt-1.5 space-y-[3px]">
              {locationOptions.map((opt) => (
                <OptionPill key={opt}>{opt}</OptionPill>
              ))}
            </div>
          </Bubble>

          {/* Customer reply 2 */}
          <Bubble side="left" delay={2500} started={started} narrow>
            <p className="text-[0.78rem]">2</p>
          </Bubble>

          {/* Business message 3 — confirmation */}
          <Bubble side="right" delay={3100} started={started}>
            <p className="text-[0.78rem] leading-snug">
              Got it — emergency leak in Lower Mission noted. Mike will call
              you back ASAP.
            </p>
            <p className="text-[0.75rem] leading-snug mt-1.5 text-white/80">
              You can also reply with photos, your address, or extra details.
            </p>
          </Bubble>

          {/* Typing indicator */}
          <div
            className={`flex justify-start transition-all duration-300 ${
              started ? "opacity-0" : "opacity-100"
            }`}
            style={{ transitionDelay: started ? "3400ms" : "0ms" }}
          >
            <div className="bg-slate-700 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
              <div className="flex gap-[3px]">
                <span className="w-[5px] h-[5px] bg-slate-400 rounded-full animate-pulse-soft" />
                <span className="w-[5px] h-[5px] bg-slate-400 rounded-full animate-pulse-soft [animation-delay:0.15s]" />
                <span className="w-[5px] h-[5px] bg-slate-400 rounded-full animate-pulse-soft [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow */}
      <div
        className="absolute -inset-3 -z-10 rounded-[2.5rem] opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(20,184,166,0.2), transparent 70%)",
        }}
      />
    </div>
  );
}

/* Reusable bubble */
function Bubble({
  side,
  delay,
  started,
  narrow,
  children,
}: {
  side: "left" | "right";
  delay: number;
  started: boolean;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div
      className={`flex ${isRight ? "justify-end" : "justify-start"} transition-all duration-500 ${
        started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionDelay: started ? `${delay}ms` : "0ms" }}
    >
      <div
        className={`${
          isRight
            ? "bg-brand-teal text-white rounded-2xl rounded-tr-sm"
            : "bg-slate-700 text-white rounded-2xl rounded-tl-sm"
        } px-3 py-2 ${narrow ? "max-w-[40%]" : "max-w-[94%]"}`}
      >
        {children}
      </div>
    </div>
  );
}

function OptionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/15 rounded-md px-2.5 py-[3px] text-[0.72rem]">
      {children}
    </div>
  );
}

/* Inline icons */
function SignalIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 14 10" fill="currentColor" className="text-slate-400">
      <rect x="10" y="2" width="2" height="8" rx="0.5" />
      <rect x="6" y="4" width="2" height="6" rx="0.5" />
      <rect x="2" y="6" width="2" height="4" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
      <path d="M1 3c2.5-2.5 9.5-2.5 12 0" />
      <path d="M3.5 5.5c1.5-1.5 5.5-1.5 7 0" />
      <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="18" height="8" viewBox="0 0 20 10" fill="none" className="text-slate-400">
      <rect x="0.5" y="0.5" width="17" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="2" width="12" height="6" rx="0.5" fill="currentColor" />
      <path d="M19 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneMissedIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      <path d="M14 2l-4 4m0-4l4 4" />
    </svg>
  );
}
