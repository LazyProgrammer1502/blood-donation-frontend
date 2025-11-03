import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [adminRole, setAdminRole] = useState(
    localStorage.getItem("adminRole") || null
  );

  const login = (email, password) => {
    if (email === "superadmin@kust.edu.pk" && password === "super123") {
      setIsLoggedIn(true);
      setAdminRole("super-admin");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminRole", "super-admin");
      return true;
    } else if (email === "admin@kust.edu.pk" && password === "admin123") {
      setIsLoggedIn(true);
      setAdminRole("admin");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminRole", "admin");
      return true;
    } else {
      alert("Invalid credentials!");
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminRole");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
