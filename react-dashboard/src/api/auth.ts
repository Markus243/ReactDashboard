import apiClient from './axios';
import type { UserDto, CreateUserDto, RefreshTokenRequestDto, User } from '../types';

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
}

export const authApi = {
  login: async (credentials: UserDto): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/Auth/login', credentials);
    return response.data;
  },

  register: async (userData: CreateUserDto): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/Auth/register', userData);
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequestDto): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<{ accessToken: string }>('/Auth/refresh-token', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/Auth/logout');
  },
};