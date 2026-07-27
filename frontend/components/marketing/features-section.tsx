import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { FEATURES, FEATURES_IMAGE } from "@/lib/constants/marketing";

export function FeaturesSection() {
  return (
    <Section id="features" className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4">Platform</Badge>
            <h2 className="text-headline-lg text-ink mb-6">
              Built for Modern Engagement
            </h2>
            <div className="space-y-8">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-violet/10 flex items-center justify-center">
                    <Icon name={feature.icon} className="text-violet" />
                  </div>
                  <div>
                    <h4 className="text-headline-md text-ink mb-1">{feature.title}</h4>
                    <p className="text-on-surface-variant">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-line shadow-xl overflow-hidden bg-white p-2">
              <Image
                src={FEATURES_IMAGE}
                alt="Close-up of NudgeDM Automation Builder UI"
                width={1400}
                height={1050}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-4 bg-white border border-line rounded-xl shadow-lg flex items-center gap-2">
              <div className="w-10 h-10 rounded-full instagram-gradient flex items-center justify-center">
                <Icon name="trending_up" className="text-white" />
              </div>
              <div>
                <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.1em]">
                  Conversion rate
                </p>
                <p className="text-headline-md text-violet">+42% Increase</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
