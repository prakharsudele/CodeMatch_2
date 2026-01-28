{matches.length === 0 ? (
  <div className="text-center text-zinc-500 mt-20">
    No matches yet. Keep swiping 👋
  </div>
) : (
  <div className="grid md:grid-cols-2 gap-6">
    {matches
      .filter((match) => match && match._id)
      .map((match) => (
        <div
          key={match._id}
          onClick={() => navigate(`/profile/${match._id}`)}
          className="cursor-pointer flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition"
        >
          <img
            src={match.avatar || "https://i.pravatar.cc/150"}
            alt={match.username || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {match.username || "Unknown User"}
            </h3>
          </div>

          <div className="text-xs text-zinc-500">
            View Profile →
          </div>
        </div>
      ))}
  </div>
)}
