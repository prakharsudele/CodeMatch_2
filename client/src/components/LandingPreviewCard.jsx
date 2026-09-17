import { motion } from "framer-motion";

const LandingPreviewCard = () => {
  const demoUser = {
    username: "dev_jane",
    name: "Jane",
    avatar: "https://i.pravatar.cc/300?img=47",
    role: "Full Stack Developer",
    bio: "Building useful things with React & Node.",
    skills: ["React", "Node.js", "MongoDB"],
    github: { publicRepos: 42 },
    leetcode: { totalSolved: 650 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.45,
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
      className="relative z-10 w-[21rem] overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_25px_70px_-20px_rgba(24,24,27,0.28)] sm:w-[23rem]"
    >
      {/* ================= HEADER ================= */}
      <div className="relative h-[118px] overflow-hidden bg-zinc-950">
        {/* Subtle red glow */}
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />

        <div className="absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[11px] font-medium text-white">
            Open to connect
          </span>
        </div>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="relative px-6 pb-6">
        {/* Avatar sits in CONTENT, not header.
            This prevents overflow-hidden from clipping it. */}
        <div className="-mt-10 flex justify-end">
          <div className="rounded-[18px] border-4 border-white bg-white shadow-lg">
            <img
              src={demoUser.avatar}
              alt="Developer profile"
              className="h-[76px] w-[76px] rounded-[14px] object-cover"
            />
          </div>
        </div>

        {/* Name / role */}
        <div className="mt-3">
          <h3 className="text-[22px] font-bold tracking-tight text-zinc-950">
            {demoUser.name}
          </h3>

          <p className="mt-0.5 text-sm font-medium text-red-500">
            {demoUser.role}
          </p>
        </div>

        {/* Bio */}
        <p className="mt-5 text-[14px] leading-6 text-zinc-500">
          {demoUser.bio}
        </p>

        {/* Skills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {demoUser.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-zinc-950">
                {demoUser.github.publicRepos}
              </span>

              <span className="text-[11px] font-medium text-zinc-400">
                repos
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">GitHub</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-zinc-950">
                {demoUser.leetcode.totalSolved}
              </span>

              <span className="text-[11px] font-medium text-zinc-400">
                solved
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400">LeetCode</p>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] gap-3">
          <button
            type="button"
            className="rounded-xl border border-zinc-200 bg-white py-3 text-sm font-semibold text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Skip
          </button>

          <button
            type="button"
            className="rounded-xl bg-red-500 py-3 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25"
          >
            Connect →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPreviewCard;