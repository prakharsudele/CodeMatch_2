import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchNotifications,
  markNotificationsRead,
} from "../api/notifications";

const NotificationsDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, []);

  const handleClick = async (n) => {
    await markNotificationsRead();

    onClose();

    if (n.type === "match_request") {
      navigate(`/profile/${n.from._id}?mode=request`);
    }

    if (n.type === "match_accepted") {
      navigate("/matches");
    }
  };

  return (
    <div className="absolute right-0 mt-3 z-50 w-[340px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-200/50">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5">
        <div>
          <h3 className="text-sm font-bold text-zinc-950">
            Notifications
          </h3>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            Updates from your developer network
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500">
            New
          </span>
        )}
      </div>

      {/* Notification list */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50">
            <span className="text-sm text-zinc-400">
              •
            </span>
          </div>

          <p className="mt-4 text-sm font-semibold text-zinc-800">
            You're all caught up
          </p>

          <p className="mt-1.5 max-w-[220px] text-xs leading-5 text-zinc-400">
            New connection requests and match updates will appear here.
          </p>
        </div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto">

          {notifications.map((n) => (
            <button
              key={n._id}
              onClick={() => handleClick(n)}
              className={`group relative flex w-full items-start gap-3 border-b border-zinc-100 px-4 py-3.5 text-left transition last:border-b-0 hover:bg-zinc-50 ${
                !n.read ? "bg-red-50/40" : "bg-white"
              }`}
            >

              {/* Unread indicator */}
              {!n.read && (
                <span className="absolute left-1.5 top-5 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}

              {/* Avatar */}
              <img
                src={n.from?.avatar || "https://i.pravatar.cc/150"}
                alt={n.from?.username || "User"}
                className="h-10 w-10 shrink-0 rounded-xl object-cover"
              />

              {/* Content */}
              <div className="min-w-0 flex-1 pr-2">

                <p className="truncate text-sm font-semibold text-zinc-900">
                  @{n.from?.username || "Unknown user"}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-zinc-500">
                  {n.type === "match_request"
                    ? "sent you a match request"
                    : "accepted your match request"}
                </p>

                <p className="mt-1 text-[10px] font-medium text-zinc-400">
                  {n.type === "match_request"
                    ? "View request"
                    : "View matches"}
                </p>
              </div>

              {/* Arrow */}
              <span className="mt-2 text-sm text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-red-500">
                →
              </span>
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;