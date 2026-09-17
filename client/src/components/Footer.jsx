const Footer = ({ variant = "dark" }) => {
  const isLight = variant === "light";
  return (
    <footer
      className={`border-t ${
        isLight
          ? "border-zinc-200 bg-white text-zinc-500"
          : "border-zinc-800 bg-zinc-950 text-zinc-400"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} CodeMatch · Built by{" "}
          <span
            className={`font-medium ${
              isLight ? "text-zinc-900" : "text-white"
            }`}
          >
            Prakhar Sudele
          </span>
        </p>

        {/* Right */}
        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://github.com/prakharsudele"
            target="_blank"
            rel="noreferrer"
            className={`transition ${
              isLight ? "hover:text-zinc-950" : "hover:text-white"
            }`}
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/prakhar-sudele-261780250/"
            target="_blank"
            rel="noreferrer"
            className={`transition ${
              isLight ? "hover:text-zinc-950" : "hover:text-white"
            }`}
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/prakhar_sudele/"
            target="_blank"
            rel="noreferrer"
            className={`transition ${
              isLight ? "hover:text-zinc-950" : "hover:text-white"
            }`}
          >
            Instagram
          </a>

          <span className={isLight ? "text-zinc-300" : "text-zinc-600"}>•</span>

          <span className="text-zinc-500">Made with ❤️ for developers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
