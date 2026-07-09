import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_LINKS } from "@/lib/constants/marketing";

export function Footer() {
  return (
    <footer className="w-full py-12 bg-surface-container-low border-t border-outline-variant">
      <Container className="flex flex-col md:flex-row justify-between items-start gap-gutter">
        <div className="flex flex-col gap-4">
          <span className="text-headline-md font-bold text-primary">NudgeDM</span>
          <p className="max-w-xs text-label-sm text-on-surface-variant">
            The #1 Instagram automation platform for creators who want to scale
            engagement and revenue.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <FooterColumn title="Product" links={FOOTER_LINKS.product} />
          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.resources} />
        </div>

        <div className="w-full pt-6 mt-6 border-t border-outline-variant md:border-none flex justify-between items-center">
          <span className="text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} NudgeDM Inc. All rights reserved.
          </span>
          <div className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 bg-outline-variant rounded" />
            <div className="w-5 h-5 bg-outline-variant rounded" />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-label-sm text-primary font-bold">{title}</p>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-label-sm text-on-surface-variant hover:text-primary underline transition-all"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
