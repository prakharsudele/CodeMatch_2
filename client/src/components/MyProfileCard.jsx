import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const github = user.github;
  const leetcode = user.leetcode;

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-zinc-200 bg-white text-zinc-950 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/50">
      {/* Header */}
      <div className="relative h-32 overflow-visible bg-zinc-950">
        {/* Red glow */}
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="absolute left-5 top-5">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
            My Profile
          </span>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-11 right-6 z-20">
          <div className="group relative rounded-[20px] border-4 border-white bg-white shadow-xl">
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
              alt="avatar"
              className="h-22 w-22 rounded-[16px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-16">
        {/* Identity */}
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-950">
            @{user.username || "Developer"}
          </h3>

          <div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">
              @{user.username || "Developer"}
            </h3>

            {user.bio ? (
              <p className="mt-2 text-sm leading-6 text-zinc-500">{user.bio}</p>
            ) : (
              <p className="mt-2 text-sm text-zinc-400">
                Add a short bio to tell developers what you're interested in.
              </p>
            )}
          </div>
        </div>

        {/* Activity summary */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-[8px] font-bold text-white">
                GH
              </span>

              <span className="text-xs font-semibold text-zinc-600">
                GitHub
              </span>
            </div>

            <p className="mt-4 text-xl font-bold text-zinc-950">
              {github?.publicRepos ?? "-"}
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-400">Repositories</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFA116] text-[8px] font-bold text-white">
                LC
              </span>

              <span className="text-xs font-semibold text-zinc-600">
                LeetCode
              </span>
            </div>

            <p className="mt-4 text-xl font-bold text-zinc-950">
              {leetcode?.totalSolved ?? "-"}
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-400">Problems solved</p>
          </div>
        </div>

        {/* Connection status */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-zinc-500">
              Profile active
            </span>
          </div>

          <span className="text-[11px] text-zinc-400">Public preview</span>
        </div>

        {/* Button */}
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
