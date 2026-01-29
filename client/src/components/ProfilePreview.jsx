const ProfilePreview = ({ user, actions }) => {
  if (!user || !user._id) return null;

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
      <img
        src={user.avatar || "https://i.pravatar.cc/150"}
        alt={user.username || "User"}
        className="w-32 h-32 rounded-full mx-auto"
      />

      <h2 className="text-xl font-semibold text-center mt-4">
        {user.username}
      </h2>

      <div className="flex justify-center gap-4 mt-4">
  {user.github && (
    <a
      href={`https://github.com/${user.username}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 text-sm hover:underline"
    >
      GitHub
    </a>
  )}

  {user.leetcode && (
    <a
      href={`https://leetcode.com/${user.leetcode.username}`}
      target="_blank"
      rel="noreferrer"
      className="text-yellow-400 text-sm hover:underline"
    >
      LeetCode
    </a>
  )}

  {user.linkedin && (
    <a
      href={user.linkedin}
      target="_blank"
      rel="noreferrer"
      className="text-sky-400 text-sm hover:underline"
    >
      LinkedIn
    </a>
  )}
</div>


      {actions && <div className="mt-6">{actions}</div>}
    </div>
  );
};

export default ProfilePreview;
