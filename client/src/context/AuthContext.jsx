import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }

  // 🔥 This removes any extra slashes at the end of your BACKEND_URL

  try {
    const res = await fetch(`${API_BASE_URL}/user/me`, { // Now it will be .app/user/me
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Unauthorized");

    const data = await res.json();
    setUser(data);
  } catch (err) {
    console.error("Fetch error:", err);
    localStorage.removeItem("token");
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMe();
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    fetchMe(); // 🔥 critical
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refetchUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
