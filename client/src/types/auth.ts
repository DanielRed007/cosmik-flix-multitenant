export interface SessionUser {
  id: string;
  name?: string;
  email: string;
}

export interface AuthState {
  accessToken: string | null;
  user: SessionUser | null;
  isAuthenticated: boolean;

  login: (accessToken: string, user: SessionUser) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}