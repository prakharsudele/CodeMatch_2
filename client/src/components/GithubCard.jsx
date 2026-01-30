import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { API_BASE_URL } from "../api";

const GithubCard = () => {
  const { user, refetchUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const connectGithub = async () => {
  setLoading(true);
  try {
    await fetch(`${API_BASE_URL}/github/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    await refetchUser();
  } catch (err) {
    console.error("GitHub sync failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">GitHub</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
          Code
        </span>
      </div>

      {user?.github ? (
        <>
          <div>
            <p className="text-sm text-zinc-400">@{user.username}</p>
            <p className="text-zinc-200 font-medium">
              GitHub Profile Connected
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-zinc-800 p-4">
              <p className="text-xl font-bold">{user.github.publicRepos}</p>
              <p className="text-xs text-zinc-500">Repositories</p>
            </div>
            <div className="rounded-lg bg-zinc-800 p-4">
              <p className="text-xl font-bold">{user.github.followers}</p>
              <p className="text-xs text-zinc-500">Followers</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-zinc-400">Keep your stats fresh</p>

            <button
              onClick={connectGithub}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              {loading ? "Syncing..." : "Sync"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-zinc-400">
            Connect GitHub to display your repositories and coding activity.
          </p>

          <button
            onClick={connectGithub}
            className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-medium"
          >
            Connect GitHub
          </button>
        </>
      )}
    </div>
  );
};

export default GithubCard;
