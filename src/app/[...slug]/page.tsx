import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGES, PAGE_SLUGS } from "@/lib/pages";
import { ContentPage } from "@/components/page/content-page";

type Params = { slug: string[] };

export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug.join("/")];
  if (!page) return {};
  return {
    title: page.title,
    description: page.intro,
  };
}

export default async function CatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = PAGES[slug.join("/")];
  if (!page) notFound();
  return <ContentPage page={page} />;
}
