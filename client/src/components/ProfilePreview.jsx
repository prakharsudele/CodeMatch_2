const ProfilePreview = ({ user, actions }) => {
  if (!user || !user._id) return null;

  return (
    <div className="max-w-md w-full mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
      
      {/* Header gradient */}
      <div className="relative h-28 bg-linear-to-r from-purple-500 to-cyan-500">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt={user.username || "User"}
          className="w-28 h-28 rounded-full object-cover border-4 border-zinc-900 absolute left-1/2 -bottom-14 -translate-x-1/2 bg-zinc-900"
        />
      </div>

      {/* Body */}
      <div className="pt-20 px-6 pb-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          @{user.username}
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Software Developer
        </p>

        {/* Social links */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          {user.github && (
            <a
              href={user.github.html_url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition"
            >
              GitHub
            </a>
          )}

          {user.leetcode && (
            <a
              href={user.leetcode.profile}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition"
            >
              LeetCode
            </a>
          )}

          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition"
            >
              LinkedIn
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4 text-sm">
          <div>
            <p className="text-lg font-semibold text-white">
              {user.leetcode?.totalSolved ?? "-"}
            </p>
            <p className="text-zinc-500">LeetCode Solved</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-white">
              {user.github?.publicRepos ?? "-"}
            </p>
            <p className="text-zinc-500">GitHub Repos</p>
          </div>
        </div>

        {/* Actions (Accept / Reject buttons) */}
        {actions && (
          <div className="mt-6">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
