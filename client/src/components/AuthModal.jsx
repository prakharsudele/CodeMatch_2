import GithubButton from "./GithubButton";

const AuthModal = ({ isOpen, onClose, variant = "dark" }) => {
  const isLight = variant === "light";
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 px-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md rounded-3xl border p-8 shadow-2xl ${
          isLight
            ? "border-zinc-200 bg-white shadow-zinc-950/10"
            : "border-zinc-800 bg-zinc-950"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${
            isLight
              ? "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }`}
          aria-label="Close"
        >
          ×
        </button>

        <h2
          className={`text-2xl font-bold tracking-tight ${
            isLight ? "text-zinc-950" : "text-white"
          }`}
        >
          Sign up to CodeMatch
        </h2>

        <p
          className={`mt-2 text-sm ${
            isLight ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
          Find developers for DSA, hackathons & real projects.
        </p>

        <div className="mt-8">
          <GithubButton onClose={onClose} />
        </div>

        <p
          className={`mt-6 text-center text-xs ${
            isLight ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          We only read your public GitHub profile.
          <br />
          We never post anything.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
