import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { authClient } from "../lib/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/api/users/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          await api.post("/api/session/sync-jwt");
        }
      } catch {
        // ignore session bootstrap errors
      }
      await refreshUser();
    };
    bootstrap();
  }, [refreshUser]);

  const syncJwt = async () => {
    await api.post("/api/session/sync-jwt");
    await refreshUser();
  };

  const login = async (email, password) => {
    const result = await authClient.signIn.email({ email, password });
    if (result.error) throw new Error(result.error.message);
    await syncJwt();
  };

  const register = async ({ name, email, password, image, role }) => {
    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      role,
    });
    if (result.error) throw new Error(result.error.message);
    await syncJwt();
    await api.patch("/api/users/role", { role });
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin,
    });
  };

  const logout = async () => {
    await api.post("/api/session/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, logout, refreshUser, syncJwt }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
