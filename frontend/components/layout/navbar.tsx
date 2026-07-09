import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/lib/constants/marketing";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-outline-variant">
      <Container className="flex justify-between items-center h-16">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-headline-md font-bold text-primary"
          >
            NudgeDM
          </Link>
          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-lg text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
          <Button size="md">Start Free</Button>
        </div>
      </Container>
    </nav>
  );
}
