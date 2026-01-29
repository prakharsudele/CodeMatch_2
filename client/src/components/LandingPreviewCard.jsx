const LandingPreviewCard = () => {
  const demoUser = {
    username: "dev_jane",
    avatar: "https://i.pravatar.cc/300?img=47",
    github: { publicRepos: 42 },
    leetcode: { totalSolved: 650 },
  };

  return (
    <div className="relative w-80 rounded-2xl overflow-hidden bg-white text-zinc-900 shadow-2xl select-none">
      {/* Swipe hints */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-6 left-6 text-3xl font-bold rotate-[-20deg] opacity-60">
          ❌
        </div>
        <div className="absolute top-6 right-6 text-3xl font-bold rotate-[20deg] opacity-60">
          ❤️
        </div>
      </div>

      {/* Top gradient */}
      <div className="h-28 bg-gradient-to-r from-purple-500 to-cyan-500 relative">
        <img
          src={demoUser.avatar}
          alt="Demo user"
          className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover bg-white"
        />
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">
          @{demoUser.username}
        </h3>

        <p className="text-sm text-zinc-500">
          Software Developer
        </p>

        <div className="mt-6 flex justify-between border-t pt-4 text-sm">
          <div>
            <p className="font-semibold">
              {demoUser.leetcode.totalSolved}
            </p>
            <p className="text-zinc-500">LeetCode</p>
          </div>
          <div>
            <p className="font-semibold">
              {demoUser.github.publicRepos}
            </p>
            <p className="text-zinc-500">GitHub</p>
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-400">
          Swipe right to connect • left to skip
        </div>
      </div>
    </div>
  );
};

export default LandingPreviewCard;
