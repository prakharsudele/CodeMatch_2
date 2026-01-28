import { useNavigate } from "react-router-dom";

const MatchRequestCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/profile/${user._id}?mode=request`)}
      className="cursor-pointer flex items-center gap-3 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
    >
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
          Tap to view profile
        </p>
      </div>

      <div className="text-xs text-zinc-400">→</div>
    </div>
  );
};

export default MatchRequestCard;
