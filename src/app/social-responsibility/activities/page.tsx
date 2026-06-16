import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ACTIVITIES } from "@/lib/posts";
import { PageBanner } from "@/components/page/page-banner";
import { Reveal, RevealGroup } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Activities",
  description: "Community programs, training and events at Najran Cement Company.",
};

export default function ActivitiesPage() {
  return (
    <main className="pb-28 md:pb-36">
      <PageBanner
        eyebrow="Social Responsibility"
        title="Activities"
        intro="Community programs, training and events from across Najran Cement Company."
      />

      <div className="container-page mt-14">
        <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((p) => (
            <Reveal key={p.slug}>
              <Link
                href={`/social-responsibility/activities/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-500 hover:shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-coal">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ash">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-kiln">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </main>
  );
}
