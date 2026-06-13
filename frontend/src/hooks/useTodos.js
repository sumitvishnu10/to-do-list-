import { useState, useEffect, useCallback } from 'react';

// Generates a random ID for local tasks
const generateId = () => Math.random().toString(36).substr(2, 9);

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load from localStorage on mount
  const fetchTodos = useCallback(() => {
    try {
      setLoading(true);
      const saved = localStorage.getItem('taskflow_todos');
      if (saved) {
        setTodos(JSON.parse(saved));
      }
      setError(null);
    } catch (err) {
      console.error('Failed to load from local storage', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('taskflow_todos', JSON.stringify(todos));
    }
  }, [todos, loading]);

  const createTodo = async (data) => {
    const newTask = {
      _id: generateId(),
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTodo = async (id, data) => {
    setTodos(prev => prev.map(t => {
      if (t._id === id) {
        return { ...t, ...data, updatedAt: new Date().toISOString() };
      }
      return t;
    }));
  };

  const toggleTodo = async (id) => {
    setTodos(prev => prev.map(t => {
      if (t._id === id) {
        return { ...t, completed: !t.completed, updatedAt: new Date().toISOString() };
      }
      return t;
    }));
  };

  const deleteTodo = async (id) => {
    setTodos(prev => prev.filter(t => t._id !== id));
  };

  const clearCompleted = async () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  return { todos, loading, error, fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo, clearCompleted };
}
