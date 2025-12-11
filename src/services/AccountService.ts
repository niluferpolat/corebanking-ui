import axiosInstance from "@/api/axios";
import type {
  AccountDetailsResponse,
  AccountResponse,
  CreateAccountRequest,
  SearchAccountsRequest,
  UpdateAccountRequest,
} from "@/types/AccountTypes";

const baseURL = "/accounts";

export const getAccountDetails = async (accountId: string): Promise<AccountDetailsResponse> => {
  const response = await axiosInstance.get(`${baseURL}/${accountId}`);
  return response.data;
};

export const updateAccountName = async (
  accountRequest: UpdateAccountRequest
): Promise<CreateAccountRequest> => {
  const response = await axiosInstance.put(`${baseURL}/${accountRequest.id}`, accountRequest);
  return response.data;
};

export const deleteAccount = async (accountId: string): Promise<void> => {
  await axiosInstance.delete(`${baseURL}/${accountId}`);
};

export const getAccounts = async (): Promise<AccountResponse[]> => {
  return await axiosInstance.get(baseURL).then((response) => response.data);
};

export const createAccount = async (
  createRequest: CreateAccountRequest
): Promise<AccountResponse> => {
  const response = await axiosInstance.post(baseURL, createRequest);
  return response.data;
};

export const searchAccounts = async (
  searchAccountRequest: SearchAccountsRequest
): Promise<AccountResponse[]> => {
  const response = await axiosInstance.post(`${baseURL}/search`, searchAccountRequest);
  return response.data;
};
