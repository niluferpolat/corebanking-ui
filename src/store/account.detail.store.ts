import type { AccountResponse } from "@/types/AccountTypes";
import { create } from "zustand";

interface SelectedAccountState {
  selectedAccount: AccountResponse | null;
  setSelectedAccount: (accounts: AccountResponse | null) => void;
  clearAccount: () => void;
}

export const useAccountDetailStore = create<SelectedAccountState>((set) => ({
  selectedAccount: null,
  setSelectedAccount: (data) =>
    set({
      selectedAccount: data,
    }),
  clearAccount: () =>
    set({
      selectedAccount: null,
    }),
}));
