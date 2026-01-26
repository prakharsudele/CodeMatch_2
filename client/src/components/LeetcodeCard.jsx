import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const LeetcodeCard = () => {
  const { user, refetchUser } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const connectLeetcode = async () => {
    if (!username) return;

    setLoading(true);

    try {
      await fetch("http://localhost:5000/leetcode/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username }),
      });

      // 🔥 THIS updates everything
      await refetchUser();
      setUsername("");
    } catch (err) {
      console.error("LeetCode connect failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold">LeetCode</h3>

      {user?.leetcode ? (
        <div className="mt-4 text-sm">
          <p className="text-zinc-400">@{user.leetcode.username}</p>
          <p>Solved: {user.leetcode.totalSolved}</p>

          <button
            onClick={connectLeetcode}
            disabled={loading}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
          >
            {loading ? "Syncing..." : "Sync LeetCode"}
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="LeetCode username"
            className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white"
          />

          <button
            onClick={connectLeetcode}
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500"
          >
            {loading ? "Connecting..." : "Connect LeetCode"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeetcodeCard;
