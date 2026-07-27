import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const LOGO_PLACEHOLDERS = [
  { width: "w-24" },
  { width: "w-32" },
  { width: "w-28" },
  { width: "w-24" },
  { width: "w-36" },
] as const;

export function TrustedBySection() {
  return (
    <Section className="py-12 border-y border-line bg-surface-container-lowest">
      <Container>
        <p className="text-center font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.14em] mb-8">
          Loved by 10,000+ creators and brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-50 grayscale">
          {LOGO_PLACEHOLDERS.map((logo, index) => (
            <div
              key={index}
              className={`h-8 ${logo.width} bg-outline/20 rounded`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
