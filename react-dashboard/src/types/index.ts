export interface User {
  id: number;
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'User';
}

export interface CreateUserDto {
  username: string;
  password: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'User';
}

export interface UserDto {
  username: string;
  password: string;
}

export interface RefreshTokenRequestDto {
  userId: number;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  pageTitle: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface ChartData {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
}