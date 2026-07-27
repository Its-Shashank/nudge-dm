import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { PRICING_PLAN } from "@/lib/constants/marketing";

export function PricingSection() {
  return (
    <Section id="pricing" className="py-16">
      <Container className="text-center">
        <Badge className="justify-center mb-4">Pricing</Badge>
        <h2 className="text-headline-lg text-ink mb-12">
          Simple Pricing for Serious Growth
        </h2>

        <div className="max-w-md mx-auto p-12 bg-white border border-line rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-6 right-6 instagram-gradient text-white text-label-sm px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            {PRICING_PLAN.badge}
          </div>

          <p className="text-headline-md text-violet mb-1">{PRICING_PLAN.name}</p>

          <div className="flex justify-center items-baseline gap-1 mb-6">
            <span className="font-display text-5xl font-bold text-ink">
              ${PRICING_PLAN.price}
            </span>
            <span className="text-on-surface-variant">/{PRICING_PLAN.period}</span>
          </div>

          <ul className="text-left space-y-4 mb-12">
            {PRICING_PLAN.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Icon name="check_circle" className="text-violet" />
                {feature}
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full">
            Get Started Now
          </Button>
        </div>
      </Container>
    </Section>
  );
}
