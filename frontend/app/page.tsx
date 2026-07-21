import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { TrustedBySection } from "@/components/marketing/trusted-by-section";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <TrustedBySection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
