"use client";

import { useEffect, useRef } from "react";

export default function ConversationScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="space-y-2 max-h-64 overflow-y-auto scroll-smooth"
    >
      {children}
    </div>
  );
}
