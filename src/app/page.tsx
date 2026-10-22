import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { BookingStrip } from "@/components/sections/booking-strip";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { HomeCareSection } from "@/components/sections/home-care-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <div id="inicio"><Hero /></div>
        <BookingStrip />
        <HomeCareSection />
        <EvaluationSection />
        <SiteFooter />
      </main>
    </>
  );
}
