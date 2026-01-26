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

  const fetchMe = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data); // 👈 FULL USER OBJECT (github + leetcode)
    } catch (err) {
      console.error("Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMe();
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
