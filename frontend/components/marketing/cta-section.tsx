import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function CtaSection() {
  return (
    <Section className="py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient opacity-10 blur-3xl -z-10" />
      <Container className="max-w-3xl">
        <div className="py-12 border border-outline-variant bg-white rounded-3xl shadow-xl px-8">
          <h2 className="text-headline-lg text-on-surface mb-4">
            Ready to automate your Instagram growth?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Join thousands of creators who are already scaling their engagement with
            NudgeDM.
          </p>
          <Button
            size="lg"
            className="px-16 shadow-xl hover:scale-105 active:scale-95"
          >
            Start Free Now
          </Button>
        </div>
      </Container>
    </Section>
  );
}
