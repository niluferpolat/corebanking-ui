import type { Transaction } from "@/types/TransactionType";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (data) =>
    set({
      transactions: data,
    }),
  clearTransactions: () =>
    set({
      transactions: [],
    }),
}));
