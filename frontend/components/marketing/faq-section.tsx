import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FAQ_ITEMS } from "@/lib/constants/marketing";

export function FaqSection() {
  return (
    <Section id="faq" className="py-16">
      <Container className="max-w-3xl">
        <div className="text-center mb-12">
          <Badge className="justify-center mb-4">FAQ</Badge>
          <h2 className="text-headline-lg text-ink">Frequently Asked Questions</h2>
        </div>
        <Accordion items={FAQ_ITEMS} />
      </Container>
    </Section>
  );
}
