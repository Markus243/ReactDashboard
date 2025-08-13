import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { ComingSoonPage } from './pages/dashboard/ComingSoonPage';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AnalyticsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Reports" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Users" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Calendar" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Messages" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Documents" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ComingSoonPage title="Settings" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Root redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* Catch all */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
