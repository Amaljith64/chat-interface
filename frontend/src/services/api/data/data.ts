import { apiClient, ApiError } from "@/lib/api-client";



export const getData = async () => {
    try {
      const response = await apiClient.get('/data');
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to get data: ${error.message}`);
      } else if (error instanceof Error) {
        throw new Error(`Failed to get data: ${error.message}`);
      } else {
        throw new Error('Failed to get data: An unknown error occurred');
      }
    }
  };

export const getChatHistory = async (id:string) => {
  try {
    const response = await apiClient.get(`/chat/history/${id}`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to get chat hoistory: ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(`Failed to get chat hoistory: ${error.message}`);
    } else {
      throw new Error('Failed to get chat hoistory: An unknown error occurred');
    }
  }
};