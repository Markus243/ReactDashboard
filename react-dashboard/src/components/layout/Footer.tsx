export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>
          © {currentYear} React Dashboard. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hover:text-primary-500 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-primary-500 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-primary-500 transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};