import type { AccountDetailsResponse, AccountResponse } from "@/types/AccountTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedAccountState {
  selectedAccount: AccountResponse | null;
  setSelectedAccount: (accounts: AccountResponse | null) => void;
  clearAccount: () => void;
}
interface AccountDetailState {
  accountDetail: AccountDetailsResponse | null;
  setAccountDetail: (accountDetail: AccountDetailsResponse | null) => void;
  clearAccountDetail: () => void;
}

// For account detail dialog or detail view
export const useAccountDetailStore = create<AccountDetailState>()(
  persist(
    (set) => ({
      accountDetail: null,
      setAccountDetail: (data) => set({ accountDetail: data }),
      clearAccountDetail: () => set({ accountDetail: null }),
    }),
    {
      name: "account-detail",
    }
  )
);

// For tracking selected account for update or delete
export const useSelectedAccountStore = create<SelectedAccountState>((set) => ({
  selectedAccount: null,
  setSelectedAccount: (account) =>
    set({
      selectedAccount: account,
    }),
  clearAccount: () =>
    set({
      selectedAccount: null,
    }),
}));
