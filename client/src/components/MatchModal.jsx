import { motion } from "framer-motion";

const MatchModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 rounded-2xl p-8 w-[360px] text-center border border-zinc-800"
      >
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-white">
          It’s a Match!
        </h2>

        <p className="mt-2 text-zinc-400">
          You and <span className="font-semibold text-white">@{user.username}</span>
          {" "}liked each other.
        </p>

        <img
          src={user.avatar}
          alt={user.username}
          className="w-20 h-20 rounded-full mx-auto mt-6 object-cover border-4 border-zinc-800"
        />

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
          >
            Keep Swiping
          </button>

          <button
            disabled
            className="flex-1 py-2 rounded-lg bg-purple-600 opacity-60 cursor-not-allowed"
          >
            View Matches
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MatchModal;
