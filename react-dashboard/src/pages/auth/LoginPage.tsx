import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAppSelector } from '../../hooks/redux';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard', { replace: true });
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <LoginForm onSuccess={handleLoginSuccess} />;
};