import type { Metadata } from "next";
import { GALLERY, COMPANY } from "@/lib/data";
import { ImagesSlider } from "@/components/ui/images-slider";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A visual tour of ${COMPANY.name} — plant, kiln, laboratory and distribution.`,
};

export default function GalleryPage() {
  return (
    <main className="pt-32 pb-28 md:pt-40 md:pb-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Media Center"
          title="Inside Najran Cement."
          intro="A visual tour of our operations — from the kiln line to dispatch. Use the arrows or your ← → keys to explore."
        />
        <div className="mt-12">
          <ImagesSlider slides={GALLERY} />
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          Placeholder slides shown — company photography to be supplied by the client.
        </p>
      </div>
    </main>
  );
}
