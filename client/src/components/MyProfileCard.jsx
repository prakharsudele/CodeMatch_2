import { useAuth } from "../context/AuthContext";

const MyProfileCard = () => {
  const { user } = useAuth();

  // Temporary mock stats (replace with backend data later)
  const profile = {
    name: user?.name || "Developer",
    role: "Software Developer",
    avatar: user?.avatar || "https://i.pravatar.cc/150",
    bio: "Building cool things with code.",
    leetcode: 0,
    githubCommits: 0,
  };

  return (
    <div className="relative w-80 rounded-2xl overflow-hidden bg-white text-zinc-900 shadow-xl">
      
      {/* Top gradient */}
      <div className="h-28 bg-gradient-to-r from-purple-500 to-cyan-500 relative">
        <img
          src={profile.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover"
        />
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">{profile.name}</h3>
        <p className="text-sm text-zinc-500">{profile.role}</p>

        <p className="mt-4 text-sm text-zinc-600">
          {profile.bio}
        </p>

        <div className="mt-6 flex justify-between border-t pt-4 text-sm">
          <div>
            <p className="font-semibold">{profile.leetcode}</p>
            <p className="text-zinc-500">LeetCode</p>
          </div>
          <div>
            <p className="font-semibold">{profile.githubCommits}</p>
            <p className="text-zinc-500">GitHub</p>
          </div>
        </div>

        <button className="mt-6 w-full py-2 rounded-lg bg-zinc-900 text-white font-medium cursor-default">
          Your Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfileCard;
