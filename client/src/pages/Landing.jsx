import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal.jsx";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar.jsx";
import LandingPreviewCard from "../components/LandingPreviewCard";

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Connect GitHub and tell the community what you build, learn, and want to work on.",
  },
  {
    number: "02",
    title: "Discover developers",
    description:
      "Explore developer profiles based on skills, interests, coding activity, and goals.",
  },
  {
    number: "03",
    title: "Start building",
    description:
      "Find someone who fits and connect when you both want to collaborate.",
  },
];

const features = [
  {
    title: "Your developer identity",
    description:
      "Bring your existing GitHub profile and coding journey into one place.",
    icon: "</>",
  },
  {
    title: "Real coding signals",
    description:
      "See projects, GitHub activity, and LeetCode progress before connecting.",
    icon: "↗",
  },
  {
    title: "Connections that make sense",
    description:
      "Find people based on shared interests instead of sending random DMs.",
    icon: "◎",
  },
];

export default function Landing() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (user) {
      navigate("/home");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar variant="light" />

      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          {/* Soft background decoration */}
          <div className="pointer-events-none absolute -top-32 right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-red-100/70 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] h-[26rem] w-[26rem] rounded-full bg-rose-50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 sm:py-24 md:grid-cols-2 lg:px-8 lg:py-28">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {/* Small badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-sm font-medium text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Built for developers
              </div>

              <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-[-0.035em] text-zinc-950 sm:text-6xl lg:text-[4.35rem]">
                Find your next{" "}
                <span className="text-red-500">coding partner.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl">
                Meet developers who share your skills, interests, and ambition —
                whether you're looking for a project partner, study buddy,
                hackathon teammate, or someone to build with.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={handlePrimaryAction}
                  className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-red-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/25 active:translate-y-0"
                >
                  {user ? "Go to CodeMatch" : "Continue with GitHub"}

                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <span className="text-sm text-zinc-500">
                  Free to join · No spam
                </span>
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                    ✓
                  </span>
                  GitHub integration
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                    ✓
                  </span>
                  Developer-first
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                    ✓
                  </span>
                  You stay in control
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex min-h-[520px] items-center justify-center md:justify-end"
            >
              {/* Background glow */}
              <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-red-50 blur-3xl" />

              {/* Small decorative circle */}
              <div className="pointer-events-none absolute right-4 top-10 h-24 w-24 rounded-full border border-red-100" />

              {/* Small grid */}
              <div
                className="pointer-events-none absolute bottom-12 left-8 h-24 w-24 opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(#e4e4e7 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* Main card */}
              <LandingPreviewCard />

              {/* GitHub status */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-5 left-0 hidden items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-xl shadow-zinc-200/60 sm:flex"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-[10px] font-bold text-white">
                  GH
                </div>

                <div>
                  <p className="text-[11px] text-zinc-400">Developer profile</p>

                  <p className="text-sm font-semibold text-zinc-900">
                    GitHub connected
                  </p>
                </div>

                <span className="text-emerald-500">✓</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= SOCIAL PROOF / INTRO ================= */}
        <section className="border-y border-zinc-100 bg-zinc-50/70">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-500">
                Developer discovery, simplified
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Stop searching. Start connecting.
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
                CodeMatch makes it easier to find people who actually fit what
                you're trying to build.
              </p>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-500">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Three steps. That's it.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-zinc-200/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-red-500">
                      {step.number}
                    </span>

                    <span className="h-px w-12 bg-zinc-200 transition-colors group-hover:bg-red-200" />
                  </div>

                  <h3 className="mt-9 text-xl font-semibold text-zinc-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="bg-zinc-950">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-400">
                  Why CodeMatch
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Built around your developer identity.
                </h2>

                <p className="mt-5 max-w-md leading-7 text-zinc-400">
                  Your GitHub, coding progress, interests, and projects tell a
                  better story than a generic social profile ever could.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-red-400/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 font-mono text-sm font-bold text-red-400">
                      {feature.icon}
                    </div>

                    <h3 className="mt-5 font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl font-bold text-red-500">
              {"</>"}
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Ready to meet your next coding partner?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-zinc-500">
              Create your developer profile and start discovering people who
              want to build, learn, and grow alongside you.
            </p>

            <button
              onClick={handlePrimaryAction}
              className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-red-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl"
            >
              {user ? "Go to CodeMatch" : "Get started"}

              <span>→</span>
            </button>
          </div>
        </section>
      </main>

      <Footer variant="light" />

      <AuthModal isOpen={open} onClose={() => setOpen(false)} variant="light" />
    </div>
  );
}
