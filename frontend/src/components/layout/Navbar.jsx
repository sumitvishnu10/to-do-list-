import { useTheme } from '../../context/ThemeContext';
import { useTodoContext } from '../../context/TodoContext';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { todos } = useTodoContext();
  
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-white/10 py-4 px-6 md:px-12 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-8 h-8 text-primary" />
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          TaskFlow Pro
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          <div className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full">
            {completedCount} / {todos.length} Completed
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
}
