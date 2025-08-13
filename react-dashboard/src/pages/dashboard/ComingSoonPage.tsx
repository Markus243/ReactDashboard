import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { setPageTitle } from '../../store/slices/uiSlice';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageTitle(title));
  }, [dispatch, title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl mx-auto mb-6 flex items-center justify-center"
        >
          <Construction className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {description || `The ${title.toLowerCase()} page is currently under development. Check back soon for updates!`}
        </p>
        
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm mx-auto">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We're working hard to bring you this feature. Stay tuned!
          </p>
        </div>
      </div>
    </motion.div>
  );
};