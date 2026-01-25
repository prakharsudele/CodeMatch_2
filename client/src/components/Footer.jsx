import React from "react";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-12 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CodeMatch
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-sm">
            Swipe. Match. Build.  
            Find developers who code like you.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
            Product
          </h3>
          <ul className="mt-4 space-y-2 text-zinc-400">
            <li className="hover:text-white cursor-pointer">How it works</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
            Community
          </h3>
          <ul className="mt-4 space-y-2 text-zinc-400">
            <li className="hover:text-white cursor-pointer">GitHub</li>
            <li className="hover:text-white cursor-pointer">LinkedIn</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 py-6 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} CodeMatch. Built for developers.
      </div>
    </footer>
  );
};

export default Footer;
