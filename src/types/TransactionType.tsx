export interface TransferRequest {
  senderAccountId: string;
  recipientUsername: string;
  recipientAccountNumber: string;
  amount: number;
}

export interface Transaction {
  fromAccount: string;
  toAccount: string;
  amount: number;
  transactionDate: string;
  transactionStatus: TransactionStatus;
}

export const TransactionStatus = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
