import { apiClient, ApiError } from "@/lib/api-client";
import { LoginCredentials, TokenResponse } from "@/types/auth";




export const registerUser = async (credentials: LoginCredentials): Promise<TokenResponse> => {
    try {
      const response = await apiClient.post('/auth/signup', credentials);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Registration failed: ${error.message}`);
      } else if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      } else {
        throw new Error('Registration failed: An unknown error occurred');
      }
    }
  };

export const loginUser = async (credentials: LoginCredentials): Promise<TokenResponse> => {
    try {
        const response = await apiClient.post("/auth/login/", credentials)
        return response
    } catch (error) {
        if (error instanceof ApiError) {
            throw new Error(`Login failed: ${error.message}`);
          } else if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
          } else {
            throw new Error('Login failed: An unknown error occurred');
          }
    }
}