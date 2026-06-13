import { useState } from 'react';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = d < today;
  return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), isOverdue };
}

export default function TaskCard({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
  });

  const dueDateInfo = formatDate(task.dueDate);

  const handleSave = () => {
    if (!editData.title.trim()) return;
    onUpdate(task._id, editData);
    setEditing(false);
  };

  return (
    <div className={`task-item priority-${task.priority}${task.completed ? ' completed' : ''}`}
      id={`task-${task._id}`}>

      <button
        className="task-checkbox-btn"
        onClick={() => onToggle(task._id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <span className="task-check-icon">✓</span>
      </button>

      {editing ? (
        <div className="task-edit-form">
          <input
            className="edit-input-inline"
            value={editData.title}
            onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
            placeholder="Task title"
            autoFocus
          />
          <div className="edit-inline-row">
            <select className="edit-select-inline" value={editData.priority}
              onChange={e => setEditData(d => ({ ...d, priority: e.target.value }))}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <input className="edit-date-inline" type="date" value={editData.dueDate}
              onChange={e => setEditData(d => ({ ...d, dueDate: e.target.value }))} />
          </div>
          <div className="edit-inline-actions">
            <button className="btn-cancel-inline" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn-save-inline" onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div className="task-body">
          <div className="task-title-text">{task.title}</div>
          {task.description && <div className="task-desc">{task.description}</div>}
          <div className="task-tags">
            <span className={`tag tag-priority-${task.priority}`}>{task.priority}</span>
            {dueDateInfo && (
              <span className={`tag-date${dueDateInfo.isOverdue && !task.completed ? ' overdue' : ''}`}>
                📅 {dueDateInfo.label}{dueDateInfo.isOverdue && !task.completed ? ' ⚠️' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {!editing && (
        <div className="task-actions-row">
          <button className="icon-btn" onClick={() => setEditing(true)} title="Edit task" aria-label="Edit task">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button className="icon-btn danger" onClick={() => onDelete(task._id)} title="Delete task" aria-label="Delete task">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
