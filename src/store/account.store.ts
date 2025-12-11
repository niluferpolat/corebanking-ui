import type { AccountResponse } from "@/types/AccountTypes";
import { create } from "zustand";

interface AccountState {
  accounts: AccountResponse[];
  setAccounts: (accounts: AccountResponse[]) => void;
  clearAccounts: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  setAccounts: (data) =>
    set({
      accounts: data,
    }),
  clearAccounts: () =>
    set({
      accounts: [],
    }),
}));
