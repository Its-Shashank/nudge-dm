import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants/marketing";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="py-16">
      <Container>
        <div className="text-center mb-16">
          <Badge className="justify-center mb-4">Process</Badge>
          <h2 className="text-headline-lg text-ink mb-2">How it Works</h2>
          <p className="text-body-lg text-on-surface-variant">
            Three simple steps to unleash your account&apos;s potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 bg-white rounded-2xl border border-line hover:border-violet/40 shadow-xl transition-all group"
            >
              <div className="w-12 h-12 rounded-full instagram-gradient text-white flex items-center justify-center mb-6 text-headline-md group-hover:scale-110 transition-transform">
                {step.step}
              </div>
              <h3 className="text-headline-md text-ink mb-4">{step.title}</h3>
              <p className="text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
