import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Performance from './pages/Performance';
import Meetings from './pages/Meetings';
import HomeButton from './components/shared/HomeButton';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <TopNav />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/meetings" element={<Meetings />} />
          </Routes>
        </main>
        <HomeButton />
      </div>
    </Router>
  );
}

export default App;