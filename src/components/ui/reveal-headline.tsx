import { cn } from "@/lib/utils";

export type RHSegment = { text: string; highlight?: boolean };

/**
 * Headline word-by-word mask reveal — PURE CSS, zero JavaScript.
 *
 * The full text is rendered in the DOM on the server (instant, SEO/a11y
 * friendly). Each word sits in an overflow-hidden clip and rises into view
 * via a GPU `translateY` animation with a staggered `animation-delay`.
 * No state, no intervals, no per-character re-renders, no JS animation loop.
 */
export function RevealHeadline({
  segments,
  className,
  highlightClass = "text-kiln-grad",
  stagger = 45,
}: {
  segments: RHSegment[];
  className?: string;
  highlightClass?: string;
  stagger?: number;
}) {
  const words: { text: string; highlight: boolean }[] = [];
  for (const seg of segments) {
    for (const part of seg.text.split(/(\s+)/).filter(Boolean)) {
      words.push({ text: /^\s+$/.test(part) ? " " : part, highlight: !!seg.highlight });
    }
  }

  let wi = 0; // index of real (non-space) words, for stagger
  return (
    <span className={cn("inline", className)}>
      {words.map((w, i) => {
        if (w.text === " ") return <span key={i}> </span>;
        const delay = Math.min(wi * stagger, 700);
        wi += 1;
        return (
          <span key={i} className="inline-flex overflow-hidden pb-[0.14em] align-bottom">
            <span
              className="reveal-word"
              style={{ "--rw-delay": `${delay}ms` } as React.CSSProperties}
            >
              <span className={w.highlight ? highlightClass : undefined}>{w.text}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
