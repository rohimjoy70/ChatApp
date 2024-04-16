import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [username, setUsername] = useState(localStorage.getItem("username"));

   const login = (newUsername) => {
      localStorage.setItem("username", newUsername);
      setUsername(newUsername);
   };

   const logout = () => {
      localStorage.removeItem("username");
   };

   return <AuthContext.Provider value={{ username, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
   return useContext(AuthContext);
}
