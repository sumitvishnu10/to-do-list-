import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto remove after 3s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

function ToastItem({ toast }) {
  useEffect(() => {
    gsap.fromTo(`.toast-${toast.id}`, 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
  }, [toast.id]);

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 
                  toast.type === 'warning' ? 'bg-yellow-500' : 'bg-emerald-500';

  return (
    <div className={`toast-${toast.id} ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg font-medium tracking-wide flex items-center gap-3 pointer-events-auto`}>
      {toast.message}
    </div>
  );
}
