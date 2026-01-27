import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    console.log("TOKEN FROM URL:", token); // 🔍 debug

    if (token) {
      login(token);
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">
      Signing you in…
    </div>
  );
};

export default AuthSuccess;
