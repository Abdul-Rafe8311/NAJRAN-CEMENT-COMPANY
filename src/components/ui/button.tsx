"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Premium CTA with magnetic pull and a sweeping kiln-glow fill. */
export function Button({ href, children, variant = "primary", className }: Props) {
  const isPrimary = variant === "primary";
  return (
    <Magnetic strength={0.25} className={cn("inline-block", className)}>
      <Link
        href={href}
        className={cn(
          "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300",
          isPrimary
            ? "bg-bone text-void hover:text-void"
            : "border border-line text-bone hover:border-kiln/60"
        )}
      >
        {isPrimary && (
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-kiln to-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        )}
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M1 7h11M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </Magnetic>
  );
}
