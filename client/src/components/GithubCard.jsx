import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const GithubCard = () => {
  const { user, refetchUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const connectGithub = async () => {
    setLoading(true);

    try {
      await fetch("http://localhost:5000/github/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // 🔥 THIS is the key
      await refetchUser();
    } catch (err) {
      console.error("GitHub sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold">GitHub</h3>

      {user?.github ? (
        <div className="mt-4 text-sm">
          <p className="text-zinc-400">@{user.username}</p>
          <p>Repos: {user.github.publicRepos}</p>
          <p>Followers: {user.github.followers}</p>

          <button
            onClick={connectGithub}
            disabled={loading}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
          >
            {loading ? "Syncing..." : "Sync GitHub"}
          </button>
        </div>
      ) : (
        <button
          onClick={connectGithub}
          className="mt-4 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500"
        >
          Connect GitHub
        </button>
      )}
    </div>
  );
};

export default GithubCard;
