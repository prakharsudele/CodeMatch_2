import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginWithGithub = () => {
    // MOCK USER (simulates GitHub OAuth success)
    const mockUser = {
      id: 1,
      name: "Prakhar",
      avatar: "https://i.pravatar.cc/150?img=12",
      githubUsername: "prakharsudele",
    };

    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGithub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
