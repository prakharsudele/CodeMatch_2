import { motion, useAnimation } from "framer-motion";

const UserCard = ({ user, onSwipe, isTop = true }) => {
  const controls = useAnimation();

  if (!user || !user._id) return null;

  const handleDragEnd = async (info) => {
    if (!isTop) return;

    if (info.offset.x > 120) {
      await controls.start({
        x: 500,
        opacity: 0,
        rotate: 20,
      });
      onSwipe("right");
    } else if (info.offset.x < -120) {
      await controls.start({
        x: -500,
        opacity: 0,
        rotate: -20,
      });
      onSwipe("left");
    }
  };

  return (
    <motion.div
      animate={controls}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => handleDragEnd(info)}
      whileDrag={{ scale: 1.05 }}
      className="relative w-80 overflow-hidden rounded-[28px] border border-zinc-200 bg-white text-zinc-900 shadow-xl shadow-zinc-200/60 cursor-grab select-none"
    >
      {/* Swipe indicators */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute left-5 top-5 rotate-[-12deg] rounded-xl border border-red-200 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-500 opacity-0 transition-opacity">
          Skip
        </div>

        <div className="absolute right-5 top-5 rotate-[12deg] rounded-xl border border-emerald-200 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500 opacity-0 transition-opacity">
          Connect
        </div>
      </div>

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

        {/* CodeMatch label */}
        <div className="absolute left-5 top-5">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            Developer
          </span>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-11 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-[20px] border-4 border-white bg-white shadow-xl">
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
              alt={user.username || "User"}
              className="h-22 w-22 rounded-[16px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-16 text-center">
        {/* Identity */}
        <h3 className="text-xl font-bold tracking-tight text-zinc-950">
          @{user.username}
        </h3>

        {user.bio ? (
          <p className="mx-auto mt-2 max-w-[250px] text-sm leading-5 text-zinc-500">
            {user.bio}
          </p>
        ) : (
          <p className="mt-1 text-xs text-zinc-400">No bio added yet</p>
        )}

        {/* Integrations */}
        <div className="mt-5 flex justify-center gap-2">
          {user.github && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] font-semibold text-zinc-600">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-zinc-950 text-[6px] font-bold text-white">
                GH
              </span>
              GitHub
            </span>
          )}

          {user.leetcode && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[10px] font-semibold text-zinc-600">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-[#FFA116] text-[6px] font-bold text-white">
                LC
              </span>
              LeetCode
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
            <p className="text-lg font-bold text-zinc-950">
              {user.leetcode?.totalSolved ?? "-"}
            </p>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              LeetCode
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
            <p className="text-lg font-bold text-zinc-950">
              {user.github?.publicRepos ?? "-"}
            </p>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              GitHub Repos
            </p>
          </div>
        </div>

        {/* Swipe instruction */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium text-zinc-400">
          <span>← Skip</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>Swipe</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>Connect →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
