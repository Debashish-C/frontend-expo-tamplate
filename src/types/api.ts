export interface AuthResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export type FetchApi = {
  method: string;
  body?: string;
}