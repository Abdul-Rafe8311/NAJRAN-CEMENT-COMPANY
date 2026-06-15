import { Preloader } from "@/components/layout/preloader";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Journey } from "@/components/sections/journey";
import { Products } from "@/components/sections/products";
import { Sustainability } from "@/components/sections/sustainability";
import { Applications } from "@/components/sections/applications";
import { Reach } from "@/components/sections/reach";
import { Investors } from "@/components/sections/investors";
import { Careers } from "@/components/sections/careers";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Impact />
        <Journey />
        <Products />
        <Sustainability />
        <Applications />
        <Reach />
        <Investors />
        <Careers />
        <FinalCta />
      </main>
    </>
  );
}
