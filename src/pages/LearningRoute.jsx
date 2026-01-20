// LearningPage.jsx - Complete Updated File
// Place this file in: src/pages/LearningPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // You need to have react-router-dom installed
import { FileText, Moon, Sun, ChevronLeft, ChevronRight, Menu, X, ChevronDown, BookOpen, Code, Zap, Database } from 'lucide-react';

// Topics JSON structure with icons
const topicsData = [
  {
    id: 'javascript',
    name: 'JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript programming',
    icon: Code
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Learn the core concepts of Artificial Intelligence programming',
    icon: Code
  },
  {
    id: 'react',
    name: 'React Basics',
    description: 'Understanding React components and hooks',
    icon: Zap
  },
  {
    id: 'lwc',
    name: 'Lightning Web Components',
    description: 'Building modern Salesforce applications with LWC',
    icon: BookOpen
  },
  {
    id: 'nodejs',
    name: 'Node.js Backend',
    description: 'Server-side JavaScript with Node.js',
    icon: Database
  }
];

// Function to load files dynamically from public/content folder
const loadFiles = async (topicId) => {
  try {
    // Fetch the manifest file that lists all files for this topic
    const response = await fetch(`/content/${topicId}/manifest.json`);
    if (!response.ok) {
      console.error(`Manifest not found for topic: ${topicId}`);
      return [];
    }
    
    const fileList = await response.json();
    
    // Load each file's content
    const files = await Promise.all(
      fileList.map(async (fileName) => {
        // Extract rank, name, and type from filename (e.g., "1_introduction.md")
        const match = fileName.match(/^(\d+)_(.+)\.(md|html|pdf)$/);
        if (!match) {
          console.warn(`Invalid filename format: ${fileName}`);
          return null;
        }
        
        const rank = parseInt(match[1]);
        const name = match[2].replace(/_/g, ' '); // Replace underscores with spaces
        const type = match[3];
        
        // Fetch file content (for PDFs, we'll use the URL directly)
        if (type === 'pdf') {
          return {
            rank,
            name,
            type,
            content: `/content/${topicId}/${fileName}` // PDF URL
          };
        }
        
        // For MD and HTML, fetch the actual content
        const fileResponse = await fetch(`/content/${topicId}/${fileName}`);
        const content = await fileResponse.text();
        
        return {
          rank,
          name,
          type,
          content
        };
      })
    );
    
    // Filter out null values and sort by rank
    return files.filter(Boolean).sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.error('Error loading files:', error);
    return [];
  }
};

const LearningRoute = () => {
  const params = useParams(); // Get URL parameters (topicId, rank)
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize from URL or load first topic
  useEffect(() => {
    const initializeFromURL = async () => {
      setLoading(true);
      const { topicId, rank } = params;
      
      // If URL has topicId and rank, load that specific content
      if (topicId && rank) {
        const topicFiles = await loadFiles(topicId);
        setFiles(topicFiles);
        setSelectedTopic(topicId);
        setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
        
        // Find the file with the matching rank
        const fileIndex = topicFiles.findIndex(f => f.rank === parseInt(rank));
        setCurrentFileIndex(fileIndex >= 0 ? fileIndex : 0);
      } 
      // Otherwise, load the first topic by default
      else if (!selectedTopic && topicsData.length > 0) {
        const firstTopic = topicsData[0].id;
        const topicFiles = await loadFiles(firstTopic);
        setFiles(topicFiles);
        setSelectedTopic(firstTopic);
        setExpandedTopics({ [firstTopic]: true });
        setCurrentFileIndex(0);
        
        if (topicFiles.length > 0) {
          window.location.hash = `/learningroute/${firstTopic}/${topicFiles[0].rank}`;
        }
      }
      setLoading(false);
    };
    
    initializeFromURL();
  }, [params.topicId, params.rank]);

  const handleTopicClick = async (topicId) => {
    setLoading(true);
    const topicFiles = await loadFiles(topicId);
    setFiles(topicFiles);
    setSelectedTopic(topicId);
    setCurrentFileIndex(0);
    
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
    
    if (topicFiles.length > 0) {
      window.location.hash = `/learningroute/${topicId}/${topicFiles[0].rank}`;
    }
    setLoading(false);
  };

  const handleFileClick = (index) => {
    setCurrentFileIndex(index);
    setSidebarOpen(false);
    
    if (files[index]) {
      window.location.hash = `/learningroute/${selectedTopic}/${files[index].rank}`;
    }
  };

  const handleNext = () => {
    if (currentFileIndex < files.length - 1) {
      const newIndex = currentFileIndex + 1;
      setCurrentFileIndex(newIndex);
      window.location.hash = `/learningroute/${selectedTopic}/${files[newIndex].rank}`;
    }
  };

  const handlePrev = () => {
    if (currentFileIndex > 0) {
      const newIndex = currentFileIndex - 1;
      setCurrentFileIndex(newIndex);
      window.location.hash = `/learningroute/${selectedTopic}/${files[newIndex].rank}`;
    }
  };

  const currentFile = files[currentFileIndex];
  const currentTopicData = topicsData.find(t => t.id === selectedTopic);

  // Render content based on file type (MD, HTML, PDF)
  const renderContent = (content, type) => {
    if (type === 'md') {
      // Simple markdown rendering
      const lines = content.split('\n');
      return lines.map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-4xl font-bold mb-6 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-semibold mb-4 mt-6">{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold mb-3 mt-5">{line.substring(4)}</h3>;
        } else if (line.startsWith('- ')) {
          return <li key={i} className="ml-6 mb-2 list-disc">{line.substring(2)}</li>;
        } else if (line.trim() === '') {
          return <div key={i} className="h-4" />;
        } else if (line.includes('**')) {
          // Handle bold text
          const parts = line.split('**');
          return (
            <p key={i} className="mb-3 leading-relaxed">
              {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
            </p>
          );
        } else {
          return <p key={i} className="mb-3 leading-relaxed">{line}</p>;
        }
      });
    } else if (type === 'html') {
      // Render HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else if (type === 'pdf') {
      // Render PDF in iframe
      return (
        <div className="w-full h-screen">
          <iframe 
            src={content} 
            className="w-full h-full rounded-lg border-0"
            title="PDF Viewer"
          />
        </div>
      );
    }
    return <div>{content}</div>;
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-purple-500' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}></div>
        <div className={`absolute top-40 right-10 w-72 h-72 ${darkMode ? 'bg-pink-500' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-40 w-72 h-72 ${darkMode ? 'bg-indigo-500' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000`}></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all ${
        darkMode 
          ? 'bg-slate-900/50 border-white/10' 
          : 'bg-white/50 border-gray-200/50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 rounded-xl transition-all ${
                  darkMode 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className={`p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                <BookOpen size={28} className={darkMode ? 'text-purple-400' : 'text-blue-600'} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Learning Center
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Master your skills
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 relative">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 fixed lg:sticky top-24 left-0 w-80 h-[calc(100vh-7rem)] overflow-y-auto transition-all duration-300 z-40 lg:z-0`}
          >
            <div className={`backdrop-blur-xl rounded-2xl border p-6 ${
              darkMode 
                ? 'bg-slate-900/60 border-white/10 shadow-2xl' 
                : 'bg-white/60 border-gray-200/50 shadow-2xl'
            }`}>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Topics
              </h2>
              
              {/* Topics Tree */}
              <div className="space-y-3">
                {topicsData.map((topic) => {
                  const Icon = topic.icon;
                  const isExpanded = expandedTopics[topic.id];
                  const isActive = selectedTopic === topic.id;
                  const topicFiles = isActive ? files : [];
                  
                  return (
                    <div key={topic.id} className="relative">
                      {/* Vertical Line for Tree Structure */}
                      {isExpanded && topicFiles.length > 0 && (
                        <div className={`absolute left-6 top-12 bottom-0 w-px ${
                          darkMode ? 'bg-gradient-to-b from-purple-500/50 to-transparent' : 'bg-gradient-to-b from-blue-500/50 to-transparent'
                        }`} style={{ height: `${topicFiles.length * 3}rem` }} />
                      )}
                      
                      {/* Topic Item */}
                      <div
                        onClick={() => handleTopicClick(topic.id)}
                        className={`group relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                          isActive
                            ? darkMode
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                            : darkMode
                            ? 'bg-white/5 hover:bg-white/10 text-white'
                            : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start gap-3 relative z-10">
                          <div className={`p-2 rounded-lg transition-all ${
                            isActive 
                              ? 'bg-white/20' 
                              : darkMode 
                              ? 'bg-purple-500/20' 
                              : 'bg-blue-500/20'
                          }`}>
                            <Icon size={20} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                              {topic.name}
                              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown size={16} />
                              </div>
                            </h3>
                            <p className={`text-xs ${
                              isActive 
                                ? 'text-white/80' 
                                : darkMode 
                                ? 'text-gray-400' 
                                : 'text-gray-600'
                            }`}>
                              {topic.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Shimmer Effect */}
                        {!isActive && (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                              darkMode 
                                ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' 
                                : 'bg-gradient-to-r from-transparent via-white/50 to-transparent'
                            }`} />
                          </div>
                        )}
                      </div>
                      
                      {/* Sub-topics (Files) - Tree Structure */}
                      {isExpanded && topicFiles.length > 0 && (
                        <div className="mt-2 ml-6 space-y-2">
                          {topicFiles.map((file, index) => {
                            const isFileActive = currentFileIndex === index && selectedTopic === topic.id;
                            
                            return (
                              <div key={index} className="relative">
                                {/* Horizontal Line */}
                                <div className={`absolute left-0 top-5 w-4 h-px ${
                                  darkMode ? 'bg-purple-500/50' : 'bg-blue-500/50'
                                }`} />
                                
                                {/* Lightning Bolt Connector */}
                                <div className={`absolute left-3 top-4 ${
                                  darkMode ? 'text-purple-500/50' : 'text-blue-500/50'
                                }`}>
                                  <Zap size={10} fill="currentColor" />
                                </div>
                                
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFileClick(index);
                                  }}
                                  className={`ml-6 pl-3 pr-3 py-2 rounded-lg cursor-pointer transition-all duration-300 text-sm group ${
                                    isFileActive
                                      ? darkMode
                                        ? 'bg-purple-500/30 text-white border border-purple-500/50 shadow-lg'
                                        : 'bg-blue-500/30 text-blue-900 border border-blue-500/50 shadow-lg'
                                      : darkMode
                                      ? 'hover:bg-white/5 text-gray-300 hover:text-white'
                                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                                      isFileActive
                                        ? darkMode
                                          ? 'bg-purple-500 text-white'
                                          : 'bg-blue-500 text-white'
                                        : darkMode
                                        ? 'bg-white/10 text-gray-400'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}>
                                      {file.rank}
                                    </span>
                                    <span className="font-medium capitalize">{file.name}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0 relative">
            <div className={`backdrop-blur-xl rounded-2xl border p-8 sm:p-12 ${
              darkMode 
                ? 'bg-slate-900/60 border-white/10 shadow-2xl' 
                : 'bg-white/60 border-gray-200/50 shadow-2xl'
            }`}>
              {loading ? (
                <div className="text-center py-20">
                  <div className={`inline-block p-6 rounded-2xl mb-6 ${
                    darkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'
                  }`}>
                    <div className="animate-spin">
                      <BookOpen size={64} className={darkMode ? 'text-purple-400' : 'text-blue-600'} />
                    </div>
                  </div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Loading content...
                  </p>
                </div>
              ) : currentFile && currentTopicData ? (
                <>
                  {/* Breadcrumb */}
                  <div className={`flex items-center gap-2 text-sm mb-8 pb-4 border-b ${
                    darkMode ? 'text-gray-400 border-white/10' : 'text-gray-600 border-gray-200'
                  }`}>
                    <BookOpen size={16} />
                    <span>{currentTopicData.name}</span>
                    <ChevronRight size={16} />
                    <span className={`capitalize ${darkMode ? 'text-purple-400' : 'text-blue-600'}`}>
                      {currentFile.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`prose max-w-none mb-12 ${darkMode ? 'prose-invert' : ''}`}>
                    {renderContent(currentFile.content, currentFile.type)}
                  </div>

                  {/* Navigation Buttons */}
                  <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t ${
                    darkMode ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <button
                      onClick={handlePrev}
                      disabled={currentFileIndex === 0 || files.length <= 1}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        currentFileIndex === 0 || files.length <= 1
                          ? darkMode
                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
                          : darkMode
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl'
                      }`}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>

                    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                      darkMode ? 'bg-white/5' : 'bg-gray-100'
                    }`}>
                      <span className={`text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {currentFileIndex + 1} / {files.length}
                      </span>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentFileIndex === files.length - 1 || files.length <= 1}
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        currentFileIndex === files.length - 1 || files.length <= 1
                          ? darkMode
                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
                          : darkMode
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl'
                      }`}
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className={`inline-block p-6 rounded-2xl mb-6 ${
                    darkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'
                  }`}>
                    <FileText size={64} className={darkMode ? 'text-purple-400' : 'text-blue-600'} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Welcome to Learning Center
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Select a topic from the sidebar to begin your learning journey
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LearningRoute;