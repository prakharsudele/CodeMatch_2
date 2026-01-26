import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const GithubCard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const { user } = useAuth();

  const connectGithub = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/github/sync", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setStats(data);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold">GitHub</h3>

      {!stats ? (
        <>
          <p className="mt-3 text-zinc-400 text-sm">
            Sync your GitHub stats to improve your profile.
          </p>
          <button
            onClick={connectGithub}
            disabled={loading}
            className="mt-6 px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50"
          >
            {loading ? "Syncing..." : "Connect GitHub"}
          </button>
        </>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{stats.publicRepos}</p>
            <p className="text-sm text-zinc-400">Repos</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.commits}</p>
            <p className="text-sm text-zinc-400">Commits</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubCard;
