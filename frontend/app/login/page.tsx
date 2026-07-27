import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { CommentToDmPreview } from "@/components/marketing/comment-dm-preview";

export const metadata: Metadata = {
  title: "Log In | NudgeDM",
  description: "Log in to your NudgeDM account to manage your automations.",
};

function BrandMark({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span
        className={`flex items-center justify-center rounded-full instagram-gradient ${
          size === "lg" ? "h-7 w-7" : "h-6 w-6"
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </span>
      <span
        className={`font-display font-semibold tracking-tight text-ink ${
          size === "lg" ? "text-2xl" : "text-[17px]"
        }`}
      >
        NudgeDM
      </span>
    </Link>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full">
      <section className="hidden w-1/2 flex-col items-center justify-center bg-surface px-16 lg:flex">
        <div className="w-full max-w-sm text-center">
          <BrandMark size="lg" />
          <p className="mt-4 text-body-lg text-on-surface-variant">
            Turn comments into customers.
          </p>
          <CommentToDmPreview className="mt-12" />
        </div>
      </section>

      <section className="flex w-full flex-1 items-center justify-center bg-white px-6 py-16 sm:px-12 lg:w-1/2">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 text-center lg:hidden">
            <BrandMark />
          </div>

          <div className="mb-8 space-y-1">
            <h1 className="text-headline-lg text-ink">Welcome back</h1>
            <p className="text-body-md text-on-surface-variant">
              Enter your credentials to access your account.
            </p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-body-md text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-violet hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
