import Navbar from "../components/Navbar";
import GithubCard from "../components/GithubCard";
import LeetcodeCard from "../components/LeetcodeCard";
import MyProfileCard from "../components/MyProfileCard";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProfileCompleteness } from "../utils/profileCompleteness";

import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { percent, missing } = getProfileCompleteness(user);

  const firstName =
    user?.username?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    "Developer";

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* =====================================================
            HERO
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[28px] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-9"
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-red-50 blur-3xl" />

          <div className="pointer-events-none absolute right-12 top-10 h-20 w-20 rounded-full border border-red-100" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                <span className="text-xs font-semibold text-red-600">
                  Developer network
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Welcome back,{" "}
                <span className="text-red-500">{firstName}</span>.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7">
                Build your profile, showcase your coding journey, and
                find developers who are worth building with.
              </p>
            </div>

            <button
              onClick={() => navigate("/swipe")}
              disabled={percent < 70}
              className={`shrink-0 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                percent < 70
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                  : "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600 hover:shadow-xl hover:shadow-red-500/25"
              }`}
            >
              {percent < 70
                ? "Complete profile first"
                : "Find Developers →"}
            </button>
          </div>
        </motion.section>

        {/* =====================================================
            COMPACT STATUS ROW
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Profile Strength */}
          <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Profile strength
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-zinc-950">
                    {percent}%
                  </span>

                  <span className="text-sm text-zinc-400">
                    complete
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-400">
                  {missing.length === 0
                    ? "Ready to match"
                    : `${missing.length} ${
                        missing.length === 1 ? "item" : "items"
                      } remaining`}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-red-500"
              />
            </div>

            {/* Missing fields */}
            {missing.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {missing.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-500"
                  >
                    + {item}
                  </span>
                ))}

                {missing.length > 3 && (
                  <span className="rounded-lg bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
                    +{missing.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-4 text-xs font-medium text-emerald-600">
                Your profile is ready for developer matching.
              </p>
            )}
          </div>

          {/* Connection Status */}
          <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Connected profiles
              </p>

              <p className="mt-1 text-lg font-bold text-zinc-950">
                Your coding identity
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {/* GitHub */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-[9px] font-bold text-white">
                  GH
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-900">
                    GitHub
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user?.github
                          ? "bg-emerald-500"
                          : "bg-zinc-300"
                      }`}
                    />

                    <span className="text-[10px] text-zinc-400">
                      {user?.github ? "Connected" : "Not connected"}
                    </span>
                  </div>
                </div>
              </div>

              {/* LeetCode */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFA116] text-[9px] font-bold text-white">
                  LC
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-900">
                    LeetCode
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        user?.leetcode
                          ? "bg-emerald-500"
                          : "bg-zinc-300"
                      }`}
                    />

                    <span className="text-[10px] text-zinc-400">
                      {user?.leetcode
                        ? "Connected"
                        : "Not connected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            MAIN DASHBOARD
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* ================= PROFILE ================= */}
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                Your identity
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950">
                Your profile
              </h2>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                This is how other developers see you.
              </p>
            </div>

            <div className="flex justify-center">
              <MyProfileCard />
            </div>
          </div>

          {/* ================= ACTIVITY ================= */}
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                Your activity
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-950">
                Developer activity
              </h2>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Connect your coding profiles and keep your stats updated.
              </p>
            </div>

            <div className="space-y-5">
              <GithubCard />
              <LeetcodeCard />
            </div>
          </div>
        </motion.section>

        {/* Bottom spacing */}
        <div className="h-10" />
      </main>
    </div>
  );
};

export default Home;