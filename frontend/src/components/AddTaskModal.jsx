import { useState } from 'react';

export default function AddTaskModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        dueDate: form.dueDate || null,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label="Add new task">
        <div className="modal-header">
          <h2 className="modal-title">📝 Add New Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-n" style={{ marginTop: 20 }}>
            <label className="form-label-n" htmlFor="task-title">Task Name *</label>
            <input
              id="task-title"
              className="form-input-n"
              placeholder="What do you need to do?"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group-n">
            <label className="form-label-n" htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              className="form-textarea-n"
              placeholder="Add details (optional)..."
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className="form-row-n">
            <div className="form-group-n">
              <label className="form-label-n" htmlFor="task-priority">Priority</label>
              <select id="task-priority" className="form-select-n" value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div className="form-group-n">
              <label className="form-label-n" htmlFor="task-due">Due Date</label>
              <input
                id="task-due"
                type="date"
                className="form-input-n"
                value={form.dueDate}
                onChange={e => set('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary-n" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary-n" disabled={loading || !form.title.trim()} id="add-task-submit">
              {loading ? 'Adding...' : '✓ Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
