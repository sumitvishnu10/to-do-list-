import { CheckCircle2, Globe, MessagesSquare, Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-white/10 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold dark:text-white">TaskFlow Pro</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <MessagesSquare className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <Link className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} TaskFlow Pro. Designed with minimal aesthetics.
      </div>
    </footer>
  );
}
