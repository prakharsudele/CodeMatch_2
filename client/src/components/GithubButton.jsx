
const GithubButton = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition text-white font-semibold border border-zinc-700"
    >
      Continue with GitHub
    </button>
  );
};

export default GithubButton;
