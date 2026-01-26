import GithubButton from "./GithubButton";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white">
          Sign up to CodeMatch
        </h2>

        <p className="mt-2 text-zinc-400 text-sm">
          Find developers for DSA, hackathons & real projects.
        </p>

        <div className="mt-8">
          <GithubButton />
        </div>

        <p className="mt-6 text-xs text-zinc-500 text-center">
          We only read your public GitHub profile.
          <br />
          We never post anything.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
