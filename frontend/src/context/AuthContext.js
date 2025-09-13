// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      const decoded = parseJwt(token);

      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        // ✅ valid token
        setUser({
          id: decoded.id || decoded._id || null,
          email: decoded.email || null,
          name: decoded.name || null,
          exp: decoded.exp || null,
        });
      } else {
        // ❌ invalid or expired → clear it
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = token;
    const decoded = parseJwt(token);
    if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
      setUser({
        id: decoded.id || decoded._id || null,
        email: decoded.email || null,
        name: decoded.name || null,
        exp: decoded.exp || null,
      });
    } else {
      // if invalid, clear immediately
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
