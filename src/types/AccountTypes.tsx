export interface AccountResponse {
  id: string;
  accountNumber: string;
  accountName: string;
}

export interface UpdateAccountRequest {
  id: string;
  accountName: string;
}

export interface CreateAccountRequest {
  accountName: string;
}

export interface SearchAccountsRequest {
  accountName?: string;
  accountNumber?: string;
}

export interface AccountDetailsResponse extends AccountResponse {
  balance: number;
  createdDate: string;
}
