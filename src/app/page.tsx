import { Preloader } from "@/components/layout/preloader";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { QuarryToConstruction } from "@/components/sections/quarry-to-construction";
import { Products } from "@/components/sections/products";
import { Sustainability } from "@/components/sections/sustainability";
import { Applications } from "@/components/sections/applications";
import { Reach } from "@/components/sections/reach";
import { Investors } from "@/components/sections/investors";
import { Careers } from "@/components/sections/careers";
import { FeyCards } from "@/components/sections/fey-cards";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="bg-[#05080f]">
        <Hero />
        <Impact />
        <QuarryToConstruction />
        <Products />
        <Sustainability />
        <Applications />
        <Reach />
        <Investors />
        <Careers />
        <FeyCards />
        <FinalCta />
      </main>
    </>
  );
}
