import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useAppSelector } from '../../hooks/redux';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSuccess = () => {
    navigate('/dashboard', { replace: true });
  };

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <RegisterForm onSuccess={handleRegisterSuccess} />;
};