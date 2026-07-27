"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block px-1 font-mono text-[11px] uppercase tracking-[0.1em] text-on-surface-variant"
        >
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          required
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Send Reset Link
      </Button>
    </form>
  );
}
