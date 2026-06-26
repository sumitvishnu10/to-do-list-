import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTodoContext } from '../../context/TodoContext';
import { useToast } from '../ui/ToastProvider';
import { Edit2, Trash2, CheckCircle, Circle, Calendar, Tag, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskCard({ task, onEdit }) {
  const { toggleTodo, deleteTodo } = useTodoContext();
  const { addToast } = useToast();
  const cardRef = useRef(null);

  useEffect(() => {
    // Entrance animation managed by TaskManagerSection stagger
  }, []);

  const handleToggle = async (e) => {
    e.stopPropagation();
    try {
      await toggleTodo(task._id);
      addToast(`Task marked as ${task.completed ? 'pending' : 'completed'}`);
    } catch (err) {
      addToast('Failed to update task', 'error');
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      // Animate out before deleting
      gsap.to(cardRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: async () => {
          await deleteTodo(task._id);
          addToast('Task deleted successfully');
        }
      });
    } catch (err) {
      addToast('Failed to delete task', 'error');
    }
  };

  const priorityColors = {
    high: 'text-red-500 bg-red-500/10 border-red-500/20',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  };

  return (
    <div 
      ref={cardRef}
      className={`group relative glass-card p-5 cursor-pointer transition-all duration-300 hover:shadow-glow dark:hover:shadow-glow overflow-hidden ${task.completed ? 'opacity-60' : ''}`}
      onClick={() => onEdit(task)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start gap-4">
        <button 
          onClick={handleToggle}
          className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-primary" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className={`text-lg font-semibold truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {task.title || 'Untitled'}
            </h4>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${priorityColors[task.priority || 'medium']}`}>
              {(task.priority || 'medium').toUpperCase()}
            </span>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md">
              <Tag className="w-3.5 h-3.5" />
              <span className="capitalize">{task.category || 'personal'}</span>
            </div>
            
            {task.dueDate && !isNaN(new Date(task.dueDate).getTime()) && (
              <div className={`flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md ${new Date(task.dueDate) < new Date() && !task.completed ? 'text-red-500 dark:text-red-400' : ''}`}>
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
            )}
            
            {task.estimatedMinutes > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.estimatedMinutes}m</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="p-2 text-gray-500 hover:text-primary bg-white dark:bg-gray-800 rounded-full shadow-sm"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-500 bg-white dark:bg-gray-800 rounded-full shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
