const MatchRequestCard = ({ user, onRespond }) => {
  const respond = async (action) => {
    await fetch("http://localhost:5000/matches/respond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        fromUserId: user._id,
        action,
      }),
    });

    // 🔥 tell parent to remove this request
    onRespond(user._id);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800">
      <img
        src={user.avatar}
        alt={user.username}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {user.username}
        </p>
        <p className="text-xs text-zinc-400">
          GitHub {user.github?.publicRepos ?? "-"} · LC {user.leetcode?.totalSolved ?? "-"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => respond("accept")}
          className="px-2 py-1 rounded-md bg-green-600 hover:bg-green-500 text-xs"
        >
          ✓
        </button>
        <button
          onClick={() => respond("reject")}
          className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MatchRequestCard;
