import { useState, useMemo } from 'react';
import { useTodoContext } from '../context/TodoContext';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export default function Dashboard() {
  const { todos, loading, createTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoContext();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  const now = new Date();
  const todayStr = now.toDateString();
  const completedToday = todos.filter(t => {
    if (!t.completed) return false;
    return new Date(t.updatedAt).toDateString() === todayStr;
  }).length;

  const overdue = todos.filter(t => {
    if (t.completed || !t.dueDate) return false;
    const d = new Date(t.dueDate);
    d.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    return d < today;
  }).length;

  const STAT_CARDS = [
    { label: 'Total', value: todos.length, icon: '📝' },
    { label: 'Active', value: activeCount, icon: '🏃' },
    { label: 'Done Today', value: completedToday, icon: '✅' },
    { label: 'Overdue', value: overdue, icon: '⚠️' },
  ];

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === 'active') result = result.filter(t => !t.completed);
    else if (filter === 'completed') result = result.filter(t => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [todos, filter, search]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return '🌅 Good morning!';
    if (h < 17) return '☀️ Good afternoon!';
    return '🌙 Good evening!';
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-greeting">{greeting()}</div>
        <h1 className="dashboard-title">
          Your <span>Tasks</span>
        </h1>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar" role="region" aria-label="Task statistics">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="task-controls">
        <div className="search-wrapper">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="search-input-n"
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search tasks"
            id="task-search"
          />
        </div>
        <div className="filter-pills" role="tablist" aria-label="Task filter">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              className={`filter-pill${filter === tab.key ? ' active' : ''}`}
              onClick={() => setFilter(tab.key)}
              role="tab"
              aria-selected={filter === tab.key}
              id={`filter-${tab.key}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button className="btn-add-task" onClick={() => setShowAddTask(true)} id="add-task-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Bulk info */}
      {completedCount > 0 && (
        <div className="bulk-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{completedCount} task{completedCount !== 1 ? 's' : ''} completed · {activeCount} remaining</span>
          <button className="btn-clear-completed" onClick={clearCompleted} id="clear-completed-btn">
            Clear Done ({completedCount})
          </button>
        </div>
      )}

      {/* Task List */}
      {loading ? (
        <div style={{ padding: '24px 0' }}>
          {[1,2,3].map(i => (
            <div key={i} className="loading-shimmer" style={{ height: 64, marginBottom: 8, borderRadius: 12 }} />
          ))}
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-trail">
          <span className="empty-emoji">
            {filter === 'completed' ? '✅' : search ? '🔍' : '📝'}
          </span>
          <h4>
            {filter === 'completed' ? 'No completed tasks' : search ? 'No tasks found' : 'Your list is empty'}
          </h4>
          <p>
            {filter === 'completed'
              ? 'Complete some tasks to see them here.'
              : search
                ? 'Try a different search term.'
                : 'Click "Add Task" to create your first task!'}
          </p>
        </div>
      ) : (
        <div className="task-list" role="list" aria-label="Tasks">
          {filteredTodos.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showAddTask && (
        <AddTaskModal onClose={() => setShowAddTask(false)} onSubmit={createTodo} />
      )}
    </div>
  );
}
