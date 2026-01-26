import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const GithubCard = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const github = user?.github;

  const connectGithub = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/github/sync", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    // 👇 merge backend response into global user
    setUser({ ...user, github: data });

    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-semibold">GitHub</h3>

      {!github ? (
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
        <>
          <p className="mt-3 text-zinc-400 text-sm">
            Connected as <span className="text-white">@{user.username}</span>
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">{github.publicRepos}</p>
              <p className="text-sm text-zinc-400">Repos</p>
            </div>
            <div>
              <p className="text-xl font-bold">{github.followers}</p>
              <p className="text-sm text-zinc-400">Followers</p>
            </div>
            <div>
              <p className="text-xl font-bold">{github.following}</p>
              <p className="text-sm text-zinc-400">Following</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubCard;
