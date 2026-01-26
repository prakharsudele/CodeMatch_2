import { useAuth } from "../context/AuthContext";

const MyProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const github = user.github;
  const leetcode = user.leetcode;

  return (
    <div className="relative w-80 rounded-2xl overflow-hidden bg-white text-zinc-900 shadow-xl">
      
      {/* Top gradient */}
      <div className="h-28 bg-gradient-to-r from-purple-500 to-cyan-500 relative">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover"
        />
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">
          {user.username || "Developer"}
        </h3>

        <p className="text-sm text-zinc-500">
          Software Developer
        </p>

        {/* GitHub */}
        {github ? (
          <div className="mt-4 text-sm">
            <p className="font-medium text-zinc-700">
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
          <p className="mt-4 text-sm text-zinc-400">
            GitHub not connected
          </p>
        )}

        {/* LeetCode */}
        {leetcode ? (
          <div className="mt-4 text-sm border-t pt-4">
            <p className="font-medium text-zinc-700">
              LeetCode · @{leetcode.username}
            </p>

            <p className="text-xs text-zinc-500">
              {leetcode.name}
            </p>

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
          <p className="mt-4 text-sm text-zinc-400">
            LeetCode not connected
          </p>
        )}

        <button className="mt-6 w-full py-2 rounded-lg bg-zinc-900 text-white font-medium cursor-default">
          Your Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfileCard;
