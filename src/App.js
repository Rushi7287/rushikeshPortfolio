import React, { useState } from 'react';
// import { Moon, Sun } from 'lucide-react';
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectsPage } from './pages/ProjectsPage';
import { LearningPage } from './pages/LearningPage';
import { LearningDetailPage } from './pages/LearningDetailPage';
import { ResumePage } from './pages/ResumePage'; // Import the new AboutPage
// import { LinkAdapter } from './components/LinkAdapter';

function App() {
  const [isDark] = useState(false);

  const bgClass = isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  // const glassClass = isDark 
  //   ? 'bg-gray-800/40 backdrop-blur-lg border border-gray-700/50' 
  //   : 'bg-white/40 backdrop-blur-lg border border-white/50';
  // const textClass = isDark ? 'text-gray-100' : 'text-gray-800';
  // const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${bgClass} transition-colors duration-500`}>
        {/* <header className={`${glassClass} shadow-lg sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${textClass}`}>My Portfolio</h1>
            
            <nav className="flex items-center gap-6">
              <LinkAdapter
                to="/projects"
                className={`px-4 py-2 rounded-lg transition-all ${textSecondaryClass}`}
              >
                Projects
              </LinkAdapter>

              <LinkAdapter
                to="/learning"
                className={`px-4 py-2 rounded-lg transition-all ${textSecondaryClass}`}
              >
                Learning
              </LinkAdapter>

              <LinkAdapter
                to="/about"
                className={`px-4 py-2 rounded-lg transition-all ${textSecondaryClass}`}
              >
                About
              </LinkAdapter>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${glassClass} hover:scale-110 transition-transform`}
              >
                {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-700" size={20} />}
              </button>
            </nav>
          </div>
        </header> */}

        {/* <main className="max-w-7xl mx-auto px-6 py-8"> */}
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<ProjectsPage isDark={isDark} />} />
            <Route path="/learning" element={<LearningPage isDark={isDark} />} />
            <Route path="/learning/:topicId" element={<LearningDetailPage isDark={isDark} />} />
            <Route path="/resume" element={<ResumePage isDark={isDark} />} />
          </Routes>
        {/* </main> */}
      </div>
    </BrowserRouter>
  );
}

export default App;