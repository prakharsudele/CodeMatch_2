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
    <div className="group rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/50">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-white">
            GH
          </div>

          <div>
            <h3 className="font-bold text-zinc-950">
              GitHub
            </h3>

            <p className="mt-0.5 text-xs text-zinc-400">
              Your open-source activity
            </p>
          </div>
        </div>

        {user?.github && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        )}
      </div>

      {user?.github ? (
        <>
          {/* Identity */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-zinc-900">
              @{user.username}
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              GitHub profile connected successfully.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-2xl font-bold text-zinc-950">
                {user.github.publicRepos}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Public repositories
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-2xl font-bold text-zinc-950">
                {user.github.followers}
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Followers
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              Keep your stats updated
            </p>

            <button
              onClick={connectGithub}
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
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm leading-6 text-zinc-500">
              Connect GitHub to showcase your repositories and
              coding activity to other developers.
            </p>
          </div>

          <button
            onClick={connectGithub}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect GitHub →"}
          </button>
        </>
      )}
    </div>
  );
};

export default GithubCard;