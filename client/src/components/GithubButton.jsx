const GithubButton = () => {
  const handleLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href = "http://localhost:5000/auth/github";
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
