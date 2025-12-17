export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (accessToken: string, user: User) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}