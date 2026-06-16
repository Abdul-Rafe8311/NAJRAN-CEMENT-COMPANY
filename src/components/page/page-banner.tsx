import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

/** Shared colored industrial banner used across inner pages. */
export function PageBanner({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/plant-full.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1c36]/95 via-[#13294a]/92 to-[#1b3a6b]/88" />
      </div>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="container-page relative pt-36 pb-16 md:pt-44 md:pb-20">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-white/70">
            <span className="h-px w-8 bg-ember" />
            {eyebrow}
          </span>
        </Reveal>
        <h1 className="font-display mt-5 max-w-4xl text-h1 font-semibold leading-[1.04] text-balance text-white">
          <TextReveal text={title} />
        </h1>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
