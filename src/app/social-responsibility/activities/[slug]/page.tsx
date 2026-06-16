import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ACTIVITIES, getPost } from "@/lib/posts";
import { PageBanner } from "@/components/page/page-banner";
import { Reveal } from "@/components/ui/reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return ACTIVITIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getPost(slug);
  if (!data) return {};
  return { title: data.post.title, description: data.post.excerpt };
}

export default async function ActivityPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = getPost(slug);
  if (!data) notFound();
  const { post, prev, next } = data;

  return (
    <main className="pb-28 md:pb-36">
      <PageBanner eyebrow="Social Responsibility · Activities" title={post.title} />

      <article className="container-page mt-14 max-w-3xl">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="mt-8 space-y-5">
          {post.body.map((p, i) => (
            <Reveal key={i}>
              <p className="text-base leading-relaxed text-ash md:text-lg">{p}</p>
            </Reveal>
          ))}
        </div>
      </article>

      {/* Prev / Next */}
      <div className="container-page mt-16 max-w-4xl">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
          <div className="bg-coal p-6">
            {prev ? (
              <Link href={`/social-responsibility/activities/${prev.slug}`} className="group block">
                <span className="text-xs uppercase tracking-wider text-muted">← Previous Post</span>
                <p className="mt-2 text-sm font-medium leading-snug transition-colors group-hover:text-kiln">{prev.title}</p>
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-wider text-muted/50">← Previous Post</span>
            )}
          </div>
          <div className="bg-coal p-6 text-right">
            {next ? (
              <Link href={`/social-responsibility/activities/${next.slug}`} className="group block">
                <span className="text-xs uppercase tracking-wider text-muted">Next Post →</span>
                <p className="mt-2 text-sm font-medium leading-snug transition-colors group-hover:text-kiln">{next.title}</p>
              </Link>
            ) : (
              <span className="text-xs uppercase tracking-wider text-muted/50">Next Post →</span>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/social-responsibility/activities" className="text-sm font-medium text-kiln hover:underline">
            ← Back to all activities
          </Link>
        </div>
      </div>
    </main>
  );
}
