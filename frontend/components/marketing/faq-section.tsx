import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FAQ_ITEMS } from "@/lib/constants/marketing";

export function FaqSection() {
  return (
    <Section id="faq" className="py-16">
      <Container className="max-w-3xl">
        <h2 className="text-headline-lg text-on-surface mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion items={FAQ_ITEMS} />
      </Container>
    </Section>
  );
}
