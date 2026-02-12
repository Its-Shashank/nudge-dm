"use client";

import { useState, useEffect } from "react";

// Target launch date — 30 days from now
const LAUNCH_DATE = new Date();
LAUNCH_DATE.setDate(LAUNCH_DATE.getDate() + 30);

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

const FEATURES = [
  {
    icon: "💬",
    title: "Auto-Reply to Comments",
    description: "Instantly DM anyone who comments on your Reels, Posts, or Stories with your links.",
  },
  {
    icon: "🔗",
    title: "Link Delivery on Autopilot",
    description: "Set trigger keywords like 'link' or 'send' and let NudgeDM handle the rest.",
  },
  {
    icon: "📊",
    title: "Track Every Click",
    description: "Know exactly how many people clicked your links. Measure what matters.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "DMs are sent within seconds of a comment. Your followers never wait.",
  },
];

export default function ComingSoon() {
  const countdown = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // TODO: Wire up to email collection API (Supabase / Resend)
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background effects */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-pattern" />
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Logo */}
        <div className="fade-in-up mb-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20">
            <div className="pulse-ring" />
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: "linear-gradient(135deg, #6C63FF 0%, #8B5CF6 50%, #EC4899 100%)",
                boxShadow: "0 8px 32px rgba(108, 99, 255, 0.3)",
              }}
            >
              📩
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="fade-in-up delay-1 mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(108, 99, 255, 0.1)",
              border: "1px solid rgba(108, 99, 255, 0.2)",
              color: "var(--accent-light)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6C63FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B83FF]"></span>
            </span>
            Coming Soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-in-up delay-2 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          <span className="block">Your DMs,</span>
          <span className="shimmer-text">On Autopilot</span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-in-up delay-3 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          <strong className="text-white">NudgeDM</strong> automatically sends DMs with your links to
          every follower who comments on your Instagram content. Set it once, earn forever.
        </p>

        {/* Countdown */}
        <div className="fade-in-up delay-3 flex gap-3 sm:gap-4 mb-12">
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Minutes", value: countdown.minutes },
            { label: "Seconds", value: countdown.seconds },
          ].map((item) => (
            <div key={item.label} className="countdown-box">
              <div className="text-2xl sm:text-3xl font-bold tabular-nums" style={{ color: "var(--accent-light)" }}>
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Email signup */}
        <div className="fade-in-up delay-4 w-full max-w-md mb-16">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div
                className="flex-1 input-glow rounded-xl transition-all duration-300"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-[var(--text-secondary)] outline-none rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-6 py-3.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Notify Me{isHovered ? " →" : ""}
              </button>
            </form>
          ) : (
            <div
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                color: "#22C55E",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M16.667 5L7.5 14.167L3.333 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              You&apos;re on the list! We&apos;ll notify you at launch.
            </div>
          )}
        </div>

        {/* Features */}
        <div className="fade-in-up delay-5 w-full max-w-2xl">
          <p
            className="text-xs uppercase tracking-[0.2em] font-medium mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            What you&apos;ll get
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="feature-card text-left">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="fade-in-up delay-5 mt-16 flex flex-col items-center gap-3">
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Built for Instagram creators who want to grow on autopilot.
          </p>
          <p className="text-xs" style={{ color: "rgba(136, 136, 160, 0.5)" }}>
            © {new Date().getFullYear()} NudgeDM. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
