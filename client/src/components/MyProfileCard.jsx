import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyProfileCard = () => {
  const { user, setUser } = useAuth();
  if (!user) return null;

  const navigate = useNavigate();

  const github = user.github;
  const leetcode = user.leetcode;

  return (
    <div className="relative w-80 rounded-2xl bg-zinc-900 text-white shadow-xl border border-zinc-800">
      {/* TOP GRADIENT */}
      <div className="relative h-28 bg-linear-to-r from-purple-500 to-cyan-500 rounded-t-2xl">
        <label className="absolute left-1/2 -bottom-10 -translate-x-1/2 cursor-pointer group z-10">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt="avatar"
            className="w-20 h-20 rounded-full border-4 border-zinc-900 object-cover"
          />

          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold transition">
            Change your GitHub profile photo
          </div>
        </label>
      </div>

      {/* CONTENT — OUTSIDE GRADIENT ✅ */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">
          {user.username || "Developer"}
        </h3>

        <p className="text-sm text-zinc-400">Software Developer</p>

        {/* GitHub */}
        {github ? (
          <div className="mt-4 text-sm">
            <p className="font-medium text-zinc-300">
              GitHub · @{user.username}
            </p>

            <div className="mt-2 flex justify-between">
              <div>
                <p className="font-semibold">{github.publicRepos}</p>
                <p className="text-zinc-500">Repos</p>
              </div>
              <div>
                <p className="font-semibold">{github.followers}</p>
                <p className="text-zinc-500">Followers</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">GitHub not connected</p>
        )}

        {/* LeetCode */}
        {leetcode ? (
          <div className="mt-4 text-sm border-t border-zinc-700 pt-4">
            <p className="font-medium text-zinc-300">
              LeetCode · @{leetcode.username}
            </p>

            <p className="text-xs text-zinc-500">{leetcode.name}</p>

            <div className="mt-2 flex justify-between">
              <div>
                <p className="font-semibold">{leetcode.easy}</p>
                <p className="text-zinc-500">Easy</p>
              </div>
              <div>
                <p className="font-semibold">{leetcode.medium}</p>
                <p className="text-zinc-500">Medium</p>
              </div>
              <div>
                <p className="font-semibold">{leetcode.hard}</p>
                <p className="text-zinc-500">Hard</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">LeetCode not connected</p>
        )}

        <button
          onClick={() => navigate("/profile/me")}
          className="mt-6 w-full py-2 rounded-lg bg-zinc-800 text-white font-medium cursor-pointer"
        >
          Your Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfileCard;
