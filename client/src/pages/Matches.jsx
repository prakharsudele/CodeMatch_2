import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../api";

const Matches = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/matches`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatches(data || []))
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar variant="light" />

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-zinc-400">
            Loading your connections...
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  const validMatches = matches.filter((match) => match && match._id);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[28px] border border-zinc-200 bg-white px-6 py-8 shadow-sm sm:px-8"
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-50 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                <span className="text-xs font-semibold text-red-600">
                  Your network
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Your connections
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Developers you've matched with on CodeMatch.
                Start a conversation or explore their profile.
              </p>
            </div>

            {/* Count */}
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-500">
                {validMatches.length}
              </div>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {validMatches.length === 1
                    ? "Connection"
                    : "Connections"}
                </p>

                <p className="text-xs text-zinc-400">
                  Matched developers
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            MATCHES
        ====================================================== */}
        {validMatches.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 flex min-h-[360px] items-center justify-center rounded-[28px] border border-zinc-200 bg-white shadow-sm"
          >
            <div className="max-w-sm px-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 8v6M22 11h-6"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-xl font-bold text-zinc-950">
                No connections yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Keep discovering developers and connect with people
                you'd like to build with.
              </p>

              <button
                onClick={() => navigate("/swipe")}
                className="mt-6 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
              >
                Discover Developers →
              </button>
            </div>
          </motion.section>
        ) : (
          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-zinc-950">
                  Your matches
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  People you've connected with.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {validMatches.map((match, index) => (
                <motion.div
                  key={match._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                  onClick={() =>
                    navigate(`/profile/${match._id}`)
                  }
                  className="group cursor-pointer rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/60"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                      Connected
                    </span>

                    <span className="text-xs text-zinc-300 transition group-hover:text-red-400">
                      →
                    </span>
                  </div>

                  {/* Avatar + identity */}
                  <div className="mt-7 flex flex-col items-center text-center">
                    <div className="rounded-[22px] border-4 border-zinc-50 bg-zinc-50 p-0.5 transition group-hover:border-red-50">
                      <img
                        src={
                          match.avatar ||
                          "https://i.pravatar.cc/150"
                        }
                        alt={match.username || "User"}
                        className="h-24 w-24 rounded-[18px] object-cover"
                      />
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-950">
                      @{match.username || "Unknown User"}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-400">
                      CodeMatch connection
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-zinc-100" />

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">
                      Matched developer
                    </span>

                    <span className="text-sm font-semibold text-zinc-700 transition group-hover:text-red-500">
                      View Profile →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <div className="h-10" />
      </main>
    </div>
  );
};

export default Matches;