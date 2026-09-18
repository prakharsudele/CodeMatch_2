import { useNavigate } from "react-router-dom";

const MatchRequestCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/profile/${user._id}?mode=request`)
      }
      className="group flex w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-sm"
    >
      <div className="relative shrink-0">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt={user.username || "User"}
          className="h-11 w-11 rounded-xl object-cover"
        />

        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900">
          @{user.username}
        </p>

        <p className="mt-0.5 text-xs text-zinc-500">
          Wants to connect with you
        </p>
      </div>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400 transition group-hover:bg-red-50 group-hover:text-red-500">
        →
      </span>
    </button>
  );
};

export default MatchRequestCard;