import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setTheme } from '../../store/slices/uiSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { theme } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Apply theme to document root and body
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    
    // Also set data attribute for additional styling hooks
    root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 min-h-[calc(100vh-170px)]"
          >
            {children}
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};