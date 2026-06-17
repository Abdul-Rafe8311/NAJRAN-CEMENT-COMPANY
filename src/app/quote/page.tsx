import type { Metadata } from "next";
import { PageBanner } from "@/components/page/page-banner";
import { QuoteForm } from "@/components/page/quote-form";

export const metadata: Metadata = {
  title: "Quote Request",
  description: "Request a quote for Najran Cement products — OPC, SRC, PPC and plastering cement.",
};

export default function QuotePage() {
  return (
    <main className="pb-28 md:pb-36">
      <PageBanner
        eyebrow="Get in touch"
        title="Quote Request"
        intro="Tell us what you need and our sales team will get back to you with a competitive quote."
      />
      <div className="container-page mt-14 max-w-5xl">
        <QuoteForm />
      </div>
    </main>
  );
}
