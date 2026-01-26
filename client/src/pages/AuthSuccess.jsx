import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      navigate("/swipe"); // protected page
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">
      Signing you in...
    </div>
  );
};

export default AuthSuccess;
