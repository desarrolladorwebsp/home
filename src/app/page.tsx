import { Hero } from "@/components/hero";
import { AgreementsSection } from "@/components/sections/agreements-section";
import { EvaluationSection } from "@/components/sections/evaluation-section";
import { HomeBenefitsSection } from "@/components/sections/home-benefits-section";
import { HomeCareSection } from "@/components/sections/home-care-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";

export default function Home() {
  return (
    <main>
      <div id="inicio"><Hero /></div>
      <HomeCareSection preview />
      <HomeBenefitsSection />
      <HowItWorksSection />
      <AgreementsSection />
      <EvaluationSection />
    </main>
  );
}
