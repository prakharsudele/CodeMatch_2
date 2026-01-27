import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Matches = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { user, loading } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/matches`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setMatches);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-950 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Matches
          </h1>

          <p className="text-zinc-400 mb-8">
            Developers you’ve mutually matched with.
          </p>

          {matches.length === 0 ? (
            <div className="text-center text-zinc-500 mt-20">
              No matches yet. Keep swiping 👋
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {matches.map((match) => (
                <div
                  key={match._id}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800"
                >
                  <img
                    src={match.avatar}
                    alt={match.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {match.username}
                    </h3>

                    <div className="mt-2 flex gap-3 text-sm">
                      {match.github && (
                        <a
                          href={`https://github.com/${match.username}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white"
                        >
                          GitHub
                        </a>
                      )}

                      {match.leetcode && (
                        <a
                          href={`https://leetcode.com/${match.leetcode.username}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white"
                        >
                          LeetCode
                        </a>
                      )}

                      {match.linkedin && (
                        <a
                          href={match.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-zinc-500">
                    Matched ✔
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Matches;
