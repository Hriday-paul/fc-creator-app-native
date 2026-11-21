export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: IMeta;
}

export interface IMeta {
  page: number;
  totalPage: number;
  limit: number;
  total: number;
}

export type Role = "USER" | "ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  picture: { url: string; key: string } | null;
  auth?: {
    role: Role;
    status: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
