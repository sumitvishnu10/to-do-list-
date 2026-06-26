import { BrowserRouter } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'react-hot-toast';

import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/layout/Navbar';

// Sections
import HeroExperience from './components/sections/HeroExperience';
import ProblemStorytelling from './components/sections/ProblemStorytelling';
import SolutionShowcase from './components/sections/SolutionShowcase';
import InteractiveDashboard from './components/sections/InteractiveDashboard';
import ProductivityAnalytics from './components/sections/ProductivityAnalytics';
import SmartCategories from './components/sections/SmartCategories';
import GoalTracking from './components/sections/GoalTracking';
import CalendarExperience from './components/sections/CalendarExperience';
import HorizontalShowcase from './components/sections/HorizontalShowcase';
import AIAssistant from './components/sections/AIAssistant';
import Testimonials from './components/sections/Testimonials';
import FooterExperience from './components/sections/FooterExperience';

import './index.css';
import 'lenis/dist/lenis.css';

function AppContent() {
  return (
    <div className="relative w-full bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroExperience />
        <ProblemStorytelling />
        <SolutionShowcase />
        <InteractiveDashboard />
        <ProductivityAnalytics />
        <SmartCategories />
        <GoalTracking />
        <CalendarExperience />
        <HorizontalShowcase />
        <AIAssistant />
        <Testimonials />
      </main>

      <FooterExperience />
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ThemeProvider>
        <TodoProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </BrowserRouter>
        </TodoProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}

export default App;
