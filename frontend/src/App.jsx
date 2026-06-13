import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider, useTodoContext } from './context/TodoContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import './index.css';

function AppLayout() {
  const { todos } = useTodoContext();
  const completed = todos.filter(t => t.completed).length;

  return (
    <div className="app">
      <Navbar todoCount={todos.length} completedCount={completed} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', marginBottom: 8 }}>Page Not Found</h2>
            <p>This page doesn't exist.</p>
            <a href="/" style={{ display: 'inline-block', marginTop: 20, color: 'var(--accent)', fontWeight: 700 }}>
              ← Back to Home
            </a>
          </div>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
