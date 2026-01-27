import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const LeetcodeCard = () => {
  const { user, refetchUser } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const connectLeetcode = async () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    if (!username) return;
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/leetcode/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username }),
      });

      await refetchUser();
      setUsername("");
    } catch (err) {
      console.error("LeetCode connect failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">LeetCode</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">
          DSA
        </span>
      </div>

      {user?.leetcode ? (
        <>
          {/* Identity */}
          <div>
            <p className="text-sm text-zinc-400">@{user.leetcode.username}</p>
            {user.leetcode.name && (
              <p className="text-zinc-200 font-medium">
                {user.leetcode.name}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-lg font-bold text-green-400">
                {user.leetcode.easy}
              </p>
              <p className="text-xs text-zinc-500">Easy</p>
            </div>
            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-lg font-bold text-yellow-400">
                {user.leetcode.medium}
              </p>
              <p className="text-xs text-zinc-500">Medium</p>
            </div>
            <div className="rounded-lg bg-zinc-800 p-3">
              <p className="text-lg font-bold text-red-400">
                {user.leetcode.hard}
              </p>
              <p className="text-xs text-zinc-500">Hard</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-zinc-400">
              Total solved:{" "}
              <span className="text-white font-semibold">
                {user.leetcode.totalSolved}
              </span>
            </p>

            <button
              onClick={connectLeetcode}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              {loading ? "Syncing..." : "Sync"}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Empty state */}
          <p className="text-sm text-zinc-400">
            Connect your LeetCode to showcase your DSA strength on your profile.
          </p>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="LeetCode username"
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white"
          />

          <button
            onClick={connectLeetcode}
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 font-medium"
          >
            {loading ? "Connecting..." : "Connect LeetCode"}
          </button>
        </>
      )}
    </div>
  );
};

export default LeetcodeCard;
