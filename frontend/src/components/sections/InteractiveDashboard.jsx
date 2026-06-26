import { useState, useRef } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiArchive, FiRefreshCw, FiCopy, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function InteractiveDashboard() {
  const { todos, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodoContext();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('active'); // active, completed, archived

  const activeTodos = todos.filter(t => !t.completed && !t.isArchived);
  const completedTodos = todos.filter(t => t.completed && !t.isArchived);
  const archivedTodos = todos.filter(t => t.isArchived);

  let displayedTodos = [];
  if (filter === 'active') displayedTodos = activeTodos;
  if (filter === 'completed') displayedTodos = completedTodos;
  if (filter === 'archived') displayedTodos = archivedTodos;

  // Sort pinned tasks to the top
  displayedTodos.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await createTodo({ title: newTaskTitle, priority: 'medium' });
      setNewTaskTitle('');
      toast.success('Task Created');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success('Task Deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTodo(id);
      toast.success('Task Status Updated');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleArchive = async (todo) => {
    try {
      await updateTodo(todo._id, { isArchived: !todo.isArchived });
      toast.success(todo.isArchived ? 'Task Restored' : 'Task Archived');
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handlePin = async (todo) => {
    try {
      await updateTodo(todo._id, { isPinned: !todo.isPinned });
      toast.success(todo.isPinned ? 'Task Unpinned' : 'Task Pinned');
    } catch (err) {
      toast.error('Action failed');
    }
  };

  const handleDuplicate = async (todo) => {
    try {
      await createTodo({ 
        title: `${todo.title} (Copy)`, 
        description: todo.description,
        priority: todo.priority,
        category: todo.category
      });
      toast.success('Task Duplicated');
    } catch (err) {
      toast.error('Action failed');
    }
  };

  return (
    <section id="tasks" className="w-full min-h-screen py-32 px-4 bg-surface dark:bg-surface-dark flex flex-col items-center">
      
      <div className="w-full max-w-4xl">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Interactive Dashboard</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Experience seamless task management with fluid micro-interactions.</p>
        </div>

        {/* Task Creation Form */}
        <form onSubmit={handleCreate} className="relative mb-12 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <FiPlus className="w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full py-6 pl-16 pr-6 bg-white dark:bg-white/5 border border-transparent dark:border-white/10 rounded-2xl text-xl shadow-sm focus:shadow-glow focus:border-primary/50 outline-none transition-all dark:text-white"
          />
        </form>

        {/* Filters */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-4">
          {['active', 'completed', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-medium capitalize transition-colors ${
                filter === f 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List with Framer Motion */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {displayedTodos.map((todo) => (
              <motion.div
                layout
                key={todo._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.01 }}
                className={`glass-card p-6 flex items-center justify-between group border-l-4 ${
                  todo.isPinned ? 'border-yellow-400' : 'border-transparent'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button 
                    onClick={() => handleToggle(todo._id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed 
                        ? 'bg-primary border-primary text-white' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                    }`}
                  >
                    <AnimatePresence>
                      {todo.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <FiCheck className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <span className={`text-lg transition-all duration-300 ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'
                  }`}>
                    {todo.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handlePin(todo)} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 ${todo.isPinned ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiStar className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDuplicate(todo)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">
                    <FiCopy className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleArchive(todo)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">
                    {todo.isArchived ? <FiRefreshCw className="w-5 h-5" /> : <FiArchive className="w-5 h-5" />}
                  </button>
                  <button onClick={() => handleDelete(todo._id)} className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/20 text-red-500 transition-colors">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {displayedTodos.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500"
            >
              No {filter} tasks found. Let's get things done!
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
