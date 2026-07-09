import { Badge } from "@/components/ui/badge";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { HERO_IMAGE } from "@/lib/constants/marketing";

export function HeroSection() {
  return (
    <Section className="px-page py-16 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
      <Badge icon="verified" className="mb-6">
        Trusted by 10,000+ top creators
      </Badge>

      <h1 className="text-headline-lg md:text-6xl md:leading-tight mb-4 text-on-surface">
        Turn Instagram Comments <br className="hidden md:block" /> Into Customers
      </h1>

      <p className="text-body-lg text-on-surface-variant max-w-2xl mb-8">
        Automatically send personalized Instagram DMs whenever someone comments on
        your posts. Scale your engagement and sales without lifting a finger.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Button size="lg" className="shadow-xl hover:shadow-primary/20">
          Start Free
        </Button>
        <Button variant="secondary" size="lg">
          <Icon name="play_circle" />
          Watch Demo
        </Button>
      </div>

      <BrowserFrame
        src={HERO_IMAGE}
        alt="NudgeDM Dashboard Interface"
        priority
      />
    </Section>
  );
}
