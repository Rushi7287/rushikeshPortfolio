import React from 'react';
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectsPage } from './pages/ProjectsPage';
import { LearningPage } from './pages/LearningPage';
import { LearningDetailPage } from './pages/LearningDetailPage';
import { ResumePage } from './pages/ResumePage';

function App() {
  return (
    <BrowserRouter>
      {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 transition-colors duration-500"> */}
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/learning/:topicId" element={<LearningDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;