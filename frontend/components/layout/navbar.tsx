import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { NAV_LINKS } from "@/lib/constants/marketing";

export function Navbar() {
  return (
    <nav className="fixed top-3 inset-x-0 z-50 px-4">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-line bg-white/70 pl-3 pr-1.5 shadow-[0_1px_2px_rgba(21,18,28,0.04),0_16px_32px_-16px_rgba(21,18,28,0.18)] backdrop-blur-xl">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full instagram-gradient">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
              NudgeDM
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="#"
            className="hidden sm:inline-flex items-center px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant hover:text-ink transition-colors duration-200"
          >
            Log In
          </Link>
          <Link
            href="#"
            className="instagram-gradient inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-label-md font-medium text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Start Free
            <Icon name="arrow_forward" className="text-[15px]" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
