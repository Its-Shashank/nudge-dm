import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { CommentToDmPreview } from "./comment-dm-preview";

export function HeroSection() {
  return (
    <Section
      reveal={false}
      className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28"
    >
      <Container className="relative grid min-w-0 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0 text-center lg:text-left">
          <Badge className="mb-6">Comment&nbsp;&rarr;&nbsp;Automatic DM</Badge>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl mb-6">
            Turn Instagram comments into{" "}
            <span className="instagram-gradient-text">automatic DMs.</span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 mb-8">
            The moment someone comments your keyword, NudgeDM replies with a
            personal DM — instantly, at any scale, without you lifting a
            finger.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
            <Button size="lg" className="shadow-xl">
              Start Free
            </Button>
            <Button variant="secondary" size="lg">
              <Icon name="play_circle" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-on-surface-variant">
            <Icon name="star" filled className="text-[15px] text-warning" />
            <span>4.9/5 from 800+ creators</span>
          </div>
        </div>

        <CommentToDmPreview className="min-w-0" />
      </Container>
    </Section>
  );
}
