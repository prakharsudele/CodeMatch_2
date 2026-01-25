import { motion } from "framer-motion";

const UserCard = ({ user, onSwipe }) => {
  return (
    <motion.div
      className="w-80 rounded-2xl overflow-hidden bg-white text-zinc-900 shadow-xl cursor-grab"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 120) onSwipe("right");
        else if (info.offset.x < -120) onSwipe("left");
      }}
      whileDrag={{ scale: 1.05 }}
    >
      {/* Top gradient */}
      <div className="h-28 bg-gradient-to-r from-purple-500 to-cyan-500 relative">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 -bottom-10 -translate-x-1/2 object-cover"
        />
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6 text-center">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-sm text-zinc-500">{user.role}</p>

        <p className="mt-4 text-sm text-zinc-600">{user.bio}</p>

        <div className="mt-6 flex justify-between border-t pt-4 text-sm">
          <div>
            <p className="font-semibold">{user.Leetcode_Questions}</p>
            <p className="text-zinc-500">LeetCode</p>
          </div>
          <div>
            <p className="font-semibold">{user.Github_Commits}</p>
            <p className="text-zinc-500">GitHub</p>
          </div>
        </div>

        <button className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white font-medium">
          Follow
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;
