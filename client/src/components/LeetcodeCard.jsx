import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LeetcodeCard = () => {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const leetcode = user?.leetcode;

  const connectLeetcode = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/leetcode/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    setUser({ ...user, leetcode: data }); // 👈 update global state
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold">LeetCode</h3>

      {!leetcode ? (
        <>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="LeetCode ID (Ex : i6kj8tfr)"
            className="mt-4 w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
          />

          <button
            onClick={connectLeetcode}
            disabled={loading || !username}
            className="mt-4 px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect LeetCode"}
          </button>
        </>
      ) : (
        <>
          <p className="mt-3 text-zinc-400 text-sm">
            Connected as <span className="text-white">@{leetcode.username}</span>
          </p>

          <p className="text-sm text-zinc-500">
            Name: {leetcode.name}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">{leetcode.easy}</p>
              <p className="text-sm text-zinc-400">Easy</p>
            </div>
            <div>
              <p className="text-xl font-bold">{leetcode.medium}</p>
              <p className="text-sm text-zinc-400">Medium</p>
            </div>
            <div>
              <p className="text-xl font-bold">{leetcode.hard}</p>
              <p className="text-sm text-zinc-400">Hard</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeetcodeCard;
