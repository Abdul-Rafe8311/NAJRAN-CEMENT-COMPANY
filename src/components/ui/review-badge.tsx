import { cn } from "@/lib/utils";

/**
 * Visible marker for placeholder content that must be confirmed by the
 * client before launch. Keeps the redesign honest: no invented facts
 * are presented as final.
 */
export function ReviewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-kiln/40 bg-kiln/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-kiln",
        className
      )}
      title="Placeholder — pending client confirmation before launch"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-kiln" />
      Pending review
    </span>
  );
}
