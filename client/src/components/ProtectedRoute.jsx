import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Please login to continue
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
