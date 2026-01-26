import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CodeMatch
          </h1>

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
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
                className="w-9 h-9 rounded-full border border-zinc-700"
              />
              <span className="text-zinc-300 text-sm font-medium">
                {user.name || "Developer"}
              </span>
              <button
                onClick={logout}
                className="text-sm text-zinc-400 hover:text-white"
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
