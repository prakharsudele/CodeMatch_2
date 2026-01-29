import Navbar from "../components/Navbar";
import GithubCard from "../components/GithubCard";
import LeetcodeCard from "../components/LeetcodeCard";
import { useNavigate } from "react-router-dom";
import MyProfileCard from "../components/MyProfileCard";
import { useAuth } from "../context/AuthContext";
import { getProfileCompleteness } from "../utils/profileCompleteness";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { percent, missing } = getProfileCompleteness(user);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-14">
        {/* Welcome */}
        <section>
          <h2 className="text-3xl font-bold">Welcome back 👋</h2>
          <p className="mt-2 text-zinc-400">
            Complete your profile and start matching with developers.
          </p>
        </section>

        {/* Profile completness % */}

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Profile completeness</h3>
            <span className="text-lg font-bold">{percent}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-cyan-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          {missing.length > 0 ? (
            <div className="text-sm text-zinc-400">
              <p className="mb-2">Complete your profile to unlock swiping:</p>
              <ul className="list-disc list-inside space-y-1">
                {missing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-green-400">
              🎉 Your profile is complete!
            </p>
          )}
        </section>

        {/* Start Swiping CTA */}
        <section className="flex items-center justify-between flex-wrap gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div>
            <h3 className="text-xl font-semibold">
              Ready to find your coding match?
            </h3>
            <p className="mt-1 text-zinc-400 text-sm">
              Swipe through developers based on skills and goals.
            </p>
          </div>

          <button
            onClick={() => navigate("/swipe")}
            disabled={percent < 70}
            className={`px-8 py-3 rounded-full font-semibold text-lg transition
    ${
      percent < 70
        ? "bg-zinc-700 cursor-not-allowed"
        : "bg-linear-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400"
    }
  `}
          >
            {percent < 70 ? "Complete profile to swipe" : "Start Swiping →"}
          </button>
        </section>

        {/* My Profile Preview */}
        <section className="space-y-6 mb-24">
          <div>
            <h3 className="text-2xl font-bold">Your profile preview</h3>
            <p className="text-zinc-400 text-sm">
              This is how other developers see you on CodeMatch.
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <MyProfileCard />
          </div>
        </section>

        {/* Integrations */}
        <section className="grid md:grid-cols-2 gap-6">
          <GithubCard />
          <LeetcodeCard />
        </section>
      </main>
    </div>
  );
};

export default Home;
