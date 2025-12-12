import axios from "@/api/axios";
import type { Transaction, TransferRequest } from "@/types/TransactionType";

const baseURL = "/transactions";
export const getTransactionHistory = async (accountId: string): Promise<Transaction[]> => {
  const response = await axios.get(`${baseURL}/account/${accountId}`);
  return response.data;
};

export const transfer = async (transferRequest: TransferRequest): Promise<Transaction> => {
  const response = await axios.post(`${baseURL}/transfer`, transferRequest);
  return response.data;
};
