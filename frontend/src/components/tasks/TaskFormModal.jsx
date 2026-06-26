import { useState, useEffect, useRef } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { useToast } from '../ui/ToastProvider';
import { X } from 'lucide-react';
import gsap from 'gsap';

export default function TaskFormModal({ task, onClose }) {
  const { createTodo, updateTodo } = useTodoContext();
  const { addToast } = useToast();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: '',
    estimatedMinutes: 0
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || 'personal',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        estimatedMinutes: task.estimatedMinutes || 0
      });
    }

    // Enter animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalRef.current, 
      { y: 50, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, [task]);

  const handleClose = () => {
    // Exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, { 
      y: 20, opacity: 0, scale: 0.95, duration: 0.2, 
      onComplete: onClose 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addToast('Title is required', 'error');
      return;
    }

    try {
      if (task) {
        await updateTodo(task._id, formData);
        addToast('Task updated successfully');
      } else {
        await createTodo(formData);
        addToast('Task created successfully');
      }
      handleClose();
    } catch (err) {
      addToast(task ? 'Failed to update task' : 'Failed to create task', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      <div 
        ref={modalRef} 
        className="relative w-full max-w-lg glass-card bg-white dark:bg-gray-900 overflow-hidden shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10">
          <h3 className="text-xl font-semibold dark:text-white">
            {task ? 'Edit Task' : 'New Task'}
          </h3>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white transition-shadow"
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white transition-shadow h-24 resize-none"
              placeholder="Add details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={e => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Est. Minutes</label>
              <input 
                type="number" 
                min="0"
                value={formData.estimatedMinutes}
                onChange={e => setFormData({...formData, estimatedMinutes: Number(e.target.value)})}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={handleClose}
              className="px-6 py-2 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-xl font-medium bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
