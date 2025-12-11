import type { AuthResponse } from "@/types/AuthenticationTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      username: null,
      isAuthenticated: false,

      login: (data) =>
        set({
          token: data.token,
          username: data.name,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          username: null,
          isAuthenticated: false,
        }),
    }),
    { name: "auth-storage" }
  )
);
