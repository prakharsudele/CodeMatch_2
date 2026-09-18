const ProfilePreview = ({ user, actions }) => {
  if (!user || !user._id) return null;

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-zinc-200 bg-white text-zinc-950 shadow-xl shadow-zinc-200/60">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="relative h-36 overflow-visible bg-zinc-950">
        {/* Red glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Label */}
        <div className="absolute bottom-5 left-6">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
            Developer Profile
          </span>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-[22px] border-4 border-white bg-white p-0.5 shadow-xl">
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
              alt={user.username || "User"}
              className="h-24 w-24 rounded-[18px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          BODY
      ====================================================== */}
      <div className="px-6 pb-7 pt-16 text-center sm:px-8">
        {/* Identity */}
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
          @{user.username}
        </h2>

        {user.bio ? (
          <p className="mx-auto mt-2 max-w-[250px] text-sm leading-5 text-zinc-500">
            {user.bio}
          </p>
        ) : (
          <p className="mt-1 text-xs text-zinc-400">No bio added yet</p>
        )}

        {/* Connection status */}
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            CodeMatch connection
          </span>
        </div>

        {/* =================================================
            SOCIAL LINKS
        ================================================== */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {user.github && (
            <a
              href={`https://github.com/${user.username}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-950 text-[7px] font-bold text-white">
                GH
              </span>
              GitHub
            </a>
          )}

          {user.leetcode && (
            <a
              href={`https://leetcode.com/${user.leetcode.username}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FFA116] text-[7px] font-bold text-white">
                LC
              </span>
              LeetCode
            </a>
          )}

          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0A66C2] text-[7px] font-bold text-white">
                in
              </span>
              LinkedIn
            </a>
          )}
        </div>

        {/* =================================================
            STATS
        ================================================== */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          {/* LeetCode */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-zinc-950">
                {user.leetcode?.totalSolved ?? "-"}
              </span>

              {user.leetcode && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFA116]" />
              )}
            </div>

            <p className="mt-1 text-[11px] font-medium text-zinc-400">
              LeetCode Solved
            </p>
          </div>

          {/* GitHub */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl font-bold text-zinc-950">
                {user.github?.publicRepos ?? "-"}
              </span>

              {user.github && (
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              )}
            </div>

            <p className="mt-1 text-[11px] font-medium text-zinc-400">
              GitHub Repositories
            </p>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================== */}
        {actions && (
          <div className="mt-7 border-t border-zinc-100 pt-6">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
