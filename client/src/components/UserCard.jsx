import { motion, useAnimation } from "framer-motion";

const UserCard = ({ user, onSwipe, isTop = true }) => {
  const controls = useAnimation();

  const handleDragEnd = async (info) => {
    if (!isTop) return;

    if (info.offset.x > 120) {
      await controls.start({
        x: 500,
        opacity: 0,
        rotate: 20,
      });
      onSwipe("right");
    } 
    else if (info.offset.x < -120) {
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
      className="relative w-80 rounded-2xl overflow-hidden bg-white text-zinc-900 shadow-xl cursor-grab select-none"
    >
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
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt={user.username}
          className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover bg-white"
        />
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">
          {user.username}
        </h3>

        <p className="text-sm text-zinc-500">
          Software Developer
        </p>

        {/* GitHub + LeetCode stats */}
        <div className="mt-6 flex justify-between border-t pt-4 text-sm">
          <div>
            <p className="font-semibold">
              {user.leetcode?.totalSolved ?? "-"}
            </p>
            <p className="text-zinc-500">LeetCode</p>
          </div>
          <div>
            <p className="font-semibold">
              {user.github?.publicRepos ?? "-"}
            </p>
            <p className="text-zinc-500">GitHub</p>
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-400">
          Swipe right to connect • left to skip
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
