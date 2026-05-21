"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_URL = "http://localhost:8000";

// Helper function to decode JWT client-side
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

// Helper function to check if token is expired
const isTokenExpired = (decoded) => {
  if (!decoded || !decoded.exp) return true;
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const cachedToken = localStorage.getItem("neurosphere_token");
        if (cachedToken) {
          const decoded = decodeToken(cachedToken);
          if (decoded && !isTokenExpired(decoded)) {
            setToken(cachedToken);
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            // Token expired or invalid, perform clean logout
            localStorage.removeItem("neurosphere_token");
          }
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem("neurosphere_token", access_token);
        const decoded = decodeToken(access_token);
        setToken(access_token);
        setUser(decoded);
        setIsAuthenticated(true);
        setLoading(false);
        return { success: true };
      } else {
        throw new Error("Invalid response format: missing access token.");
      }
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.detail || err.message || "Login failed";
      throw new Error(errorMessage);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.detail || err.message || "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("neurosphere_token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Perform redirection
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
