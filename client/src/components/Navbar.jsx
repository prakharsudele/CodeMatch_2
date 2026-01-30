import { useState , useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import NotificationsDropdown from "./NotificationsDropdown";
import { fetchNotifications } from "../api/notifications";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [openNotifications, setOpenNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-zinc-400 hover:text-white";

  useEffect(() => {
    if (!user) return;

    fetchNotifications().then((data) => {
      const unread = data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    });
  }, [user]);

  return (
    <>
      <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            CodeMatch
          </Link>

          {/* Right side */}
          {!user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpenAuth(true)}
                className="px-5 py-2 rounded-full border border-zinc-700 text-zinc-300 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => setOpenAuth(true)}
                className="px-5 py-2 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              {/* Home */}
              <Link
                to="/home"
                className={`text-sm font-medium ${isActive("/home")}`}
              >
                Home
              </Link>

              {/* Matches */}
              <Link
                to="/matches"
                className={`text-sm font-medium  ${isActive("/matches")}`}
              >
                Matches
              </Link>

              {/* Swipe */}
              <Link
                to="/swipe"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
                  ${
                    location.pathname === "/swipe"
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }
                `}
              >
                Swipe
              </Link>

              {/* Notifications (placeholder) */}
              <div className="relative">
                <button
                  onClick={() => setOpenNotifications((p) => !p)}
                  className="relative text-zinc-400 hover:text-white transition cursor-pointer"
                  title="Notifications"
                >
                  🔔
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  )}
                </button>

                {openNotifications && (
                  <NotificationsDropdown
                    onClose={() => setOpenNotifications(false)}
                  />
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenu((p) => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-zinc-800 transition"
                >
                  <img
                    src={user.avatar || "https://i.pravatar.cc/40"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border border-zinc-700"
                  />
                  <span className="text-zinc-300 text-sm font-medium hidden sm:block">
                    @{user.username}
                  </span>
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 w-40 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
                    <button
                      onClick={() => navigate("/profile/me")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-800"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default Navbar;
