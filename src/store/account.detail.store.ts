import type { AccountDetailsResponse, AccountResponse } from "@/types/AccountTypes";
import { create } from "zustand";

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
export const useAccountDetailStore = create<AccountDetailState>((set) => ({
  accountDetail: null,
  setAccountDetail: (detail) =>
    set({
      accountDetail: detail,
    }),
  clearAccountDetail: () =>
    set({
      accountDetail: null,
    }),
}));

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
