import { useAuth } from "../context/AuthContext";

const GithubButton = ({ onClose }) => {
  const { loginWithGithub } = useAuth();

  const handleLogin = () => {
    loginWithGithub();
    onClose();
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
