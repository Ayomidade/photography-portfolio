/**
 * AdminAuthContext
 *
 * Manages admin session state.
 * On mount, calls GET /api/admin/me to restore active session.
 * Provides login(), logout(), admin state, and loading flag.
 */

import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL= import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    fetch(`${BASE_URL}/admin/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setAdmin(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed.");
    setAdmin(data.data);

  };

  const logout = async () => {
    await fetch(`${BASE_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return ctx;
};