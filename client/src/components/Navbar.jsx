import React from "react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="relative text-2xl font-extrabold tracking-tight">
          <span >
            CodeMatch
          </span>
          {/* glow */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 opacity-20 blur-xl -z-10"></span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative px-5 py-2 rounded-full text-zinc-300 hover:text-white transition font-medium group">
            Login
            <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-1/2 transition-all -translate-x-1/2"></span>
          </button>

          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 transition font-semibold text-white shadow-lg shadow-purple-500/20">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};
