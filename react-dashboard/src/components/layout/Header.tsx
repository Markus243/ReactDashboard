import { motion } from 'framer-motion';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown 
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleSidebar, toggleTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

export const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { theme, pageTitle } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userMenuRef, () => setUserMenuOpen(false));
  useOnClickOutside(notificationsRef, () => setNotificationsOpen(false));

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-600 transition-all duration-200 w-64"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                    No new notifications
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user?.role?.toLowerCase()}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    @{user?.username}
                  </div>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};