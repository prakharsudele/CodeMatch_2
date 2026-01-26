import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on refresh
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  fetch("http://localhost:5000/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      setUser(data); // ✅ real user from backend
    })
    .catch(() => {
      localStorage.removeItem("token");
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);




  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser , login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
