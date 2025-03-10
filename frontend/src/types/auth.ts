

export interface UserInfo {
    id: number;
    email: string;
    username: string;
    name: string;
  }
  
  export interface TokenResponse {
    access: string;
    refresh: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
