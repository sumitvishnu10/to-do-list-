import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import TaskCard from '../tasks/TaskCard';
import TaskFormModal from '../tasks/TaskFormModal';
import { Plus, Search, Filter, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TaskManagerSection() {
  const { 
    filteredTodos, 
    searchQuery, setSearchQuery, 
    filterCategory, setFilterCategory, 
    filterStatus, setFilterStatus 
  } = useTodoContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const containerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Only animate list when it enters view
    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.from(listRef.current.children, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [filteredTodos.length]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div ref={containerRef} className="w-full h-full pt-24 pb-12 px-4 flex flex-col items-center bg-background dark:bg-background-dark">
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-3xl font-bold dark:text-white flex items-center gap-3">
          Your Workspace
          <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            {filteredTodos.length} Tasks
          </span>
        </h2>
        
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none transition-shadow dark:text-white"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary outline-none cursor-pointer dark:text-white"
            >
              {['All', 'Work', 'Personal', 'Study', 'Shopping'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative flex bg-gray-100 dark:bg-surface-dark rounded-xl p-1">
            {['All', 'Pending', 'Completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status 
                    ? 'bg-white dark:bg-white/10 text-primary shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full max-w-5xl flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filteredTodos.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No tasks found</p>
            <p className="text-sm mt-1">Try adjusting your filters or create a new task.</p>
          </div>
        ) : (
          <div ref={listRef} className="grid grid-cols-1 gap-4">
            {filteredTodos.map(task => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskFormModal 
          task={editingTask} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
