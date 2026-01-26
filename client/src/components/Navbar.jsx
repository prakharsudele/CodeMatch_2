import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CodeMatch
          </div>

          {!user ? (
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold"
            >
              Sign up
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full border border-zinc-700"
              />
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

      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
