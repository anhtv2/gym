export interface LoginRequest {
  email: string;
  password: string;
}
export interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}
export interface LoginResponse {
  access_token: string;
  user: UserInfo;
}
