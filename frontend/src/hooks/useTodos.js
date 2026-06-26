import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Added state for filtering and search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Completed', 'Pending'

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setTodos(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load tasks', err);
      setError('Failed to load tasks from server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (todoData) => {
    try {
      const { data } = await axios.post(API_URL, todoData);
      setTodos(prev => [data.data, ...prev]);
      return data.data;
    } catch (err) {
      console.error('Create error', err);
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, todoData);
      setTodos(prev => prev.map(t => (t._id === id ? data.data : t)));
      return data.data;
    } catch (err) {
      console.error('Update error', err);
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${id}/toggle`);
      setTodos(prev => prev.map(t => (t._id === id ? data.data : t)));
    } catch (err) {
      console.error('Toggle error', err);
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Delete error', err);
      throw err;
    }
  };

  const clearCompleted = async () => {
    try {
      await axios.delete(`${API_URL}/completed`);
      setTodos(prev => prev.filter(t => !t.completed));
    } catch (err) {
      console.error('Clear completed error', err);
      throw err;
    }
  };

  const filteredTodos = todos.filter(todo => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const t = (todo.title || '').toLowerCase();
      const d = (todo.description || '').toLowerCase();
      if (!t.includes(q) && !d.includes(q)) return false;
    }
    // Category
    const cat = (todo.category || 'personal').toLowerCase();
    if (filterCategory !== 'All' && cat !== filterCategory.toLowerCase()) {
      return false;
    }
    // Status
    if (filterStatus === 'Completed' && !todo.completed) return false;
    if (filterStatus === 'Pending' && todo.completed) return false;
    
    return true;
  });

  return {
    todos,
    filteredTodos,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  };
}
