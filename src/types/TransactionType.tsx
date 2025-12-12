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

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
