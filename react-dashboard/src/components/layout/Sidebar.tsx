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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setSidebarOpen(false))}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-lg",
          "md:relative md:shadow-none md:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Dashboard
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  v1.0.0
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors md:hidden"
            >
              <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </button>
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
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
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
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Upgrade Plan
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Get more features
                  </p>
                </div>
              </div>
              <button className="w-full py-2 px-3 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};