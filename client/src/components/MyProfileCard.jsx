import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const github = user.github;
  const leetcode = user.leetcode;

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[24px] border border-zinc-200 bg-white text-zinc-950 shadow-sm transition-shadow hover:shadow-lg hover:shadow-zinc-200/60">
      {/* Header */}
      <div className="relative h-28 overflow-visible bg-zinc-950">
        <div className="absolute -right-12 -top-20 h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="absolute bottom-4 left-5">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
            Developer Profile
          </span>
        </div>

        {/* Avatar */}
        <label className="absolute -bottom-10 right-6 z-20 cursor-pointer">
          <div className="group relative rounded-[18px] border-4 border-white bg-white shadow-lg">
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
              alt="avatar"
              className="h-20 w-20 rounded-[14px] object-cover"
            />

            <div className="absolute inset-1 flex items-center justify-center rounded-[12px] bg-black/60 px-2 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
              Change photo
            </div>
          </div>
        </label>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-14">
        <div>
          <h3 className="text-xl font-bold tracking-tight">
            {user.username || "Developer"}
          </h3>

          <p className="mt-1 text-sm font-medium text-red-500">
            Software Developer
          </p>
        </div>

        {/* GitHub */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          {github ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">GitHub</p>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    @{user.username}
                  </p>
                </div>

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-[9px] font-bold text-white">
                  GH
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 divide-x divide-zinc-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-zinc-950">
                    {github.publicRepos}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">
                    Repositories
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-zinc-950">
                    {github.followers}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Followers</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-400">GitHub not connected</p>
          )}
        </div>

        {/* LeetCode */}
        <div className="mt-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          {leetcode ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    LeetCode
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-400">
                    @{leetcode.username}
                  </p>
                </div>

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFA116] text-[10px] font-bold text-white">
                  LC
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-zinc-200 text-center">
                <div>
                  <p className="text-lg font-bold text-emerald-500">
                    {leetcode.easy}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Easy</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-amber-500">
                    {leetcode.medium}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Medium</p>
                </div>

                <div>
                  <p className="text-lg font-bold text-red-500">
                    {leetcode.hard}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">Hard</p>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-200 pt-3 text-center">
                <span className="text-xs text-zinc-400">Total solved </span>
                <span className="text-sm font-bold text-zinc-900">
                  {leetcode.totalSolved}
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-400">LeetCode not connected</p>
          )}
        </div>

        {/* Profile button */}
        <button
          onClick={() => navigate("/profile/me")}
          className="mt-5 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          View Your Profile →
        </button>
      </div>
    </div>
  );
};

export default MyProfileCard;
