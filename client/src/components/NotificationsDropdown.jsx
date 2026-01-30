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
    <div className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden z-50">
      <div className="p-3 font-semibold border-b border-zinc-800">
        Notifications
      </div>

      {notifications.length === 0 ? (
        <div className="p-4 text-sm text-zinc-400">
          No notifications yet
        </div>
      ) : (
        notifications.map((n) => (
          <button
            key={n._id}
            onClick={() => handleClick(n)}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-zinc-800 transition
              ${!n.read ? "bg-zinc-800/50" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <img
                src={n.from.avatar}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-white">
                  @{n.from.username}
                </p>
                <p className="text-xs text-zinc-400">
                  {n.type === "match_request"
                    ? "sent you a match request"
                    : "accepted your match 🎉"}
                </p>
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default NotificationsDropdown;
