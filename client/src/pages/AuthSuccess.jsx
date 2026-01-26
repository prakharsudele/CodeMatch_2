import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasRun = useRef(false); // 👈 key fix

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN FROM URL:", token);

    if (token) {
      login(token);
      navigate("/swipe", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">
      Signing you in...
    </div>
  );
};

export default AuthSuccess;
