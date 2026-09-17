import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { API_BASE_URL } from "../api";

const LeetcodeCard = () => {
  const { user, refetchUser } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const connectLeetcode = async () => {
    setLoading(true);

    try {
      await fetch(`${API_BASE_URL}/leetcode/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(
          user?.leetcode ? {} : { username: username.trim() }
        ),
      });

      await refetchUser();
      setUsername("");
    } catch (err) {
      console.error("LeetCode sync failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/50">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFA116] text-xs font-bold text-white">
            LC
          </div>

          <div>
            <h3 className="font-bold text-zinc-950">
              LeetCode
            </h3>

            <p className="mt-0.5 text-xs text-zinc-400">
              Your problem-solving activity
            </p>
          </div>
        </div>

        {user?.leetcode && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        )}
      </div>

      {user?.leetcode ? (
        <>
          {/* Identity */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-zinc-900">
              @{user.leetcode.username}
            </p>

            {user.leetcode.name && (
              <p className="mt-1 text-sm text-zinc-400">
                {user.leetcode.name}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <p className="text-xl font-bold text-emerald-500">
                {user.leetcode.easy}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Easy
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <p className="text-xl font-bold text-amber-500">
                {user.leetcode.medium}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Medium
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <p className="text-xl font-bold text-red-500">
                {user.leetcode.hard}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Hard
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Total solved{" "}
              <span className="font-bold text-zinc-900">
                {user.leetcode.totalSolved}
              </span>
            </p>

            <button
              onClick={connectLeetcode}
              disabled={loading}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Syncing..." : "Sync"}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Empty state */}
          <div className="mt-6">
            <p className="text-sm leading-6 text-zinc-500">
              Connect your LeetCode profile to showcase your
              problem-solving experience.
            </p>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter LeetCode username"
              className="mt-4 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"
            />

            <button
              onClick={connectLeetcode}
              disabled={loading}
              className="mt-3 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Connecting..." : "Connect LeetCode →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeetcodeCard;