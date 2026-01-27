import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openAuth, setOpenAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            CodeMatch
          </Link>

          {/* Right side */}
          {!user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpenAuth(true)}
                className="px-5 py-2 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition"
              >
                Login
              </button>

              <button
                onClick={() => setOpenAuth(true)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">

  {/* Matches */}
  <Link
    to="/matches"
    className="relative text-sm font-medium text-zinc-400 hover:text-white transition"
  >
    Matches
    <span className="absolute -bottom-1 left-0 h-px w-0 bg-zinc-400 transition-all group-hover:w-full" />
  </Link>

  {/* Swipe (primary) */}
  <Link
    to="/swipe"
    className="px-4 py-1.5 rounded-full bg-zinc-800 text-sm font-semibold text-white hover:bg-zinc-700 transition"
  >
    Swipe
  </Link>

  {/* Profile */}
  <button
    onClick={() => navigate("/home")}
    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full hover:bg-zinc-800 transition"
  >
    <img
      src={user.avatar || "https://i.pravatar.cc/40"}
      alt="avatar"
      className="w-9 h-9 rounded-full border border-zinc-700"
    />
    <span className="text-zinc-300 text-sm font-medium hidden sm:block">
      @{user.username || "developer"}
    </span>
  </button>

  {/* Divider */}
  <div className="h-6 w-px bg-zinc-700" />

  {/* Logout */}
  <button 
    onClick={logout}
    className="text-sm text-zinc-400 hover:text-red-400 transition"
  >
    Logout
  </button>
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
