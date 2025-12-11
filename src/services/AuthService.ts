import axios from "@/api/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/AuthenticationTypes";

const baseURL = "/users";

export const login = async (loginRequest: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${baseURL}/login`, loginRequest);
  return response.data;
};

export const register = async (registerRequest: RegisterRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${baseURL}/register`, registerRequest);
  return response.data;
};
