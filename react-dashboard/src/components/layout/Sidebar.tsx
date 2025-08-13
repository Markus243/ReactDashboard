import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  TrendingUp,
  Calendar,
  Mail,
  X
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useResponsive } from '../../hooks/useResponsive';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: TrendingUp, label: 'Reports', path: '/reports' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Mail, label: 'Messages', path: '/messages' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { isMobile } = useResponsive();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setSidebarOpen(false))}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 288 : isMobile ? 288 : 0,
          x: sidebarOpen ? 0 : isMobile ? -288 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "h-full bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0",
          isMobile && "fixed top-0 left-0 z-50 shadow-lg"
        )}
      >
        <div className="flex flex-col h-full w-72">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 h-[85px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  v1.0.0
                </p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => dispatch(setSidebarOpen(false))}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path === '/dashboard' && location.pathname === '/');
                
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-dark-700 dark:to-dark-700 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-400 to-primary-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Upgrade Plan
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Get more features
                  </p>
                </div>
              </div>
              <button className="w-full py-2 px-3 bg-white dark:bg-dark-600 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-500 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};