import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth state is checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Checking authentication...
      </div>
    );
  }

  // If not logged in → kick to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in → allow access
  return children;
};

export default RequireAuth;
