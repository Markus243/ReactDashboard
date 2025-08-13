# CLAUDE.md

This file provides **architectural guidance** and **best practices** for the **React frontend** in this repository.

---

## Overview

This is a **React 19 (Vite + TypeScript)** dashboard app communicating with an **ASP.NET Core backend** via REST APIs.  
The backend is managed separately — this document covers only the **frontend**.  
The project is a **dashboard template** with:
- Modern login screen
- Dashboard layout (header, sidebar navigation, widget-ready content area)
- Easily adaptable structure
- Support light and dark mode modern UI
- Leverage modern react-component practices
---

## Frontend Architecture

- **Framework**: React 19 + Vite + TypeScript  
- **Routing**: React Router v7  
- **State Management**: Redux Toolkit (RTK)  
- **Styling**: Tailwind CSS  
- **API Layer**: Axios with interceptors  
- **Auth**: JWT (short-lived access token + refresh token)  
- **Data Fetching**: RTK Query or Thunks in slices  

---

## Development Commands

### Frontend 
- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Authentication Strategy

### Token Handling
- **Access Token**:
  - Short-lived (5–15 min)
  - Stored **only in Redux store** (in-memory)
  - Added to requests via `Authorization: Bearer <token>`
- **Refresh Token**:
  - Secure, HTTP-only cookie (backend managed)
  - Auto-sent to `/auth/refresh`

### Auth Flow
1. **Login**
   - POST `/auth/login` → returns `accessToken`
   - Store token in Redux `auth` slice
2. **API Requests**
   - Axios interceptor injects `Authorization` header
3. **Token Expiration**
   - On `401` → call `/auth/refresh`
   - If successful → update token & retry request
   - If failed → logout
4. **Logout**
   - Clear Redux state
   - Call `/auth/logout` to clear refresh cookie

---

## Redux State Management Best Practices

### Store Organization
src/
store/
index.ts // Store setup
slices/
authSlice.ts // Auth state & reducers
uiSlice.ts // UI state (sidebar, theme, etc.)
dataSlice.ts // Domain-specific data

- Use **RTK slices** for clear separation of concerns  
- Keep API logic in `services/` with RTK Query or thunks  
- Avoid storing **non-serializable data** in Redux  
- Use `createAsyncThunk` for side effects  
- Reset slices on logout

---

## API Layer Guidelines
- Centralize Axios instance in `api/axios.ts`
- Apply request interceptor for `Authorization` header
- Apply response interceptor for `401` handling
- Keep API functions pure — no direct UI updates

---
