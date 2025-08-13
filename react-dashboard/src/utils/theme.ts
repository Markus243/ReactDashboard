// Theme initialization utility
export const initializeTheme = () => {
  if (typeof window === 'undefined') return;

  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  const root = document.documentElement;
  const body = document.body;
  
  if (theme === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
  }
  
  root.setAttribute('data-theme', theme);
  
  if (!savedTheme) {
    localStorage.setItem('theme', theme);
  }
  
  return theme;
};

// Call immediately to prevent flash of wrong theme
initializeTheme();