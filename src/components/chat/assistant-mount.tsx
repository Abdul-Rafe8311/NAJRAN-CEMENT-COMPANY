"use client";

import dynamic from "next/dynamic";

// Lazy-load the AI assistant client-side only. It is non-critical for
// first paint, so its JS loads as a separate chunk after hydration
// rather than blocking initial render.
const Assistant = dynamic(() => import("./assistant").then((m) => m.Assistant), {
  ssr: false,
});

export function AssistantMount() {
  return <Assistant />;
}
