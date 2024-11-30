import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import type { User } from "../types/User";
import { fetchUserProfile } from "../services/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  hasToken: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");
  const hasToken = Boolean(token);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    enabled: hasToken,
    retry: false,
  });

  useEffect(() => {
    if (!token || isLoading) {
      return;
    }
    if (isError) {
      setUser(null);
      localStorage.removeItem("token");
    }
    if (data) {
      setUser(data);
    }
  }, [token, isLoading, isError, data]);

  const value = useMemo(() => ({ user, setUser, isLoading, hasToken }), [
    user,
    setUser,
    isLoading,
    hasToken,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
