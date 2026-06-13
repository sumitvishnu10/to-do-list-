import { createContext, useContext } from 'react';
import { useTodos } from '../hooks/useTodos';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const todoState = useTodos();
  return (
    <TodoContext.Provider value={todoState}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
