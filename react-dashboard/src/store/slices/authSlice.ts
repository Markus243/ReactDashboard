import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, UserDto, CreateUserDto } from '../../types';
import axios from 'axios';

const API_BASE_URL = '/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: UserDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, credentials);
      console.log('Login response:', response.data); // Debug log
      
      // Handle API response format with wrapper object
      const data = response.data;
      
      // Check if it's a wrapped response with result property
      if (data.result && typeof data.result === 'object') {
        const result = data.result;
        return {
          accessToken: result.token,
          user: {
            id: result.id,
            username: result.userName || credentials.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            role: (result.role || 'User') as 'Admin' | 'User',
          }
        };
      }
      
      // If the response is a token string, create a user object
      if (typeof data === 'string') {
        return {
          accessToken: data,
          user: {
            id: 1, // Mock user data since API doesn't provide user info
            username: credentials.username,
            firstName: 'User',
            lastName: 'Name',
            role: 'User' as const,
          }
        };
      }
      
      // If the response has token/accessToken property directly
      if (data.token || data.accessToken) {
        return {
          accessToken: data.token || data.accessToken,
          user: data.user || {
            id: data.id || 1,
            username: credentials.username,
            firstName: data.firstName || 'User',
            lastName: data.lastName || 'Name',
            role: (data.role || 'User') as 'Admin' | 'User',
          }
        };
      }
      
      // Return the data as-is if it already has the expected format
      return data;
    } catch (error: unknown) {
      console.error('Login error:', error); // Debug log
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Login failed');
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: CreateUserDto, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/register`, userData);
      console.log('Register response:', response.data); // Debug log
      
      // Handle API response format with wrapper object
      const data = response.data;
      
      // Check if it's a wrapped response with result property
      if (data.result && typeof data.result === 'object') {
        const result = data.result;
        return {
          accessToken: result.token,
          user: {
            id: result.id,
            username: result.userName || userData.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            role: (result.role || userData.role) as 'Admin' | 'User',
          }
        };
      }
      
      // Fallback to direct response format
      return data;
    } catch (error: unknown) {
      console.error('Register error:', error); // Debug log
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Registration failed');
      }
      return rejectWithValue('Registration failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/refresh-token`);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(axiosError.response?.data?.message || 'Token refresh failed');
      }
      return rejectWithValue('Token refresh failed');
    }
  }
);

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  try {
    const savedToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      return {
        user: JSON.parse(savedUser),
        accessToken: savedToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
  
  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.error = null;
      
      // Persist to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Login fulfilled with payload:', action.payload); // Debug log
        
        if (action.payload?.accessToken && action.payload?.user) {
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.error = null;
          
          // Persist to localStorage
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        } else {
          console.error('Invalid login response format:', action.payload);
          state.error = 'Invalid response from server';
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, logout, clearError } = authSlice.actions;
export default authSlice.reducer;