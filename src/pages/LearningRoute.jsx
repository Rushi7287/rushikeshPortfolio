import React, { useState, useEffect } from 'react';
import { FileText, Moon, Sun, ChevronLeft, ChevronRight, Menu, X, ChevronDown, BookOpen, Code, Zap, Database, Search, MessageCircle, Send, User } from 'lucide-react';

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

// Dummy API configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Dummy API endpoint

// Function to load files dynamically from public/content folder
const loadFiles = async (topicId) => {
  try {
    const response = await fetch(`/rushikeshPortfolio/content/${topicId}/manifest.json`);
    if (!response.ok) {
      console.error(`Manifest not found for topic: ${topicId}`);
      return [];
    }
    
    const fileList = await response.json();
    
    const files = await Promise.all(
      fileList.map(async (fileName) => {
        const match = fileName.match(/^(\d+)_(.+)\.(md|html|pdf)$/);
        if (!match) {
          console.warn(`Invalid filename format: ${fileName}`);
          return null;
        }
        
        const rank = parseInt(match[1]);
        const name = match[2].replace(/_/g, ' ');
        const type = match[3];
        
        if (type === 'pdf') {
          return {
            rank,
            name,
            type,
            content: `/rushikeshPortfolio/content/${topicId}/${fileName}`
          };
        }
        
        const fileResponse = await fetch(`/rushikeshPortfolio/content/${topicId}/${fileName}`);
        const content = await fileResponse.text();
        
        return {
          rank,
          name,
          type,
          content
        };
      })
    );
    
    return files.filter(Boolean).sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.error('Error loading files:', error);
    return [];
  }
};

const LearningRoute = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(topicsData);
  
  // Comments state
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTopics(topicsData);
    } else {
      const filtered = topicsData.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTopics(filtered);
    }
  }, [searchQuery]);

  // Load comments for current topic/file
  useEffect(() => {
    if (selectedTopic && currentFileIndex !== null) {
      loadComments(selectedTopic, currentFileIndex);
    }
  }, [selectedTopic, currentFileIndex]);

  // Dummy API: Fetch comments
  const loadComments = async (topicId, fileIndex) => {
    const commentKey = `${topicId}-${fileIndex}`;
    
    // Check if comments already loaded
    if (comments[commentKey]) return;
    
    try {
      // Using JSONPlaceholder as dummy API
      const response = await fetch(`${API_BASE_URL}/comments?postId=${fileIndex + 1}`);
      const data = await response.json();
      
      // Transform dummy data to our format (take first 3 comments)
      const transformedComments = data.slice(0, 3).map(comment => ({
        id: comment.id,
        userName: comment.email.split('@')[0],
        text: comment.body,
        timestamp: new Date().toISOString()
      }));
      
      setComments(prev => ({
        ...prev,
        [commentKey]: transformedComments
      }));
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments(prev => ({
        ...prev,
        [commentKey]: []
      }));
    }
  };

  // Dummy API: Post comment
  const postComment = async () => {
    if (!newComment.trim() || !userName.trim()) {
      alert('Please enter your name and comment');
      return;
    }
    
    setCommentLoading(true);
    const commentKey = `${selectedTopic}-${currentFileIndex}`;
    
    try {
      // Dummy POST request
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: currentFileIndex + 1,
          name: userName,
          body: newComment,
          email: `${userName}@example.com`
        })
      });
      
      const data = await response.json();
      
      // Add new comment to state
      const newCommentObj = {
        id: data.id || Date.now(),
        userName: userName,
        text: newComment,
        timestamp: new Date().toISOString()
      };
      
      setComments(prev => ({
        ...prev,
        [commentKey]: [newCommentObj, ...(prev[commentKey] || [])]
      }));
      
      // Clear form
      setNewComment('');
      alert('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  // Initialize from URL or load first topic
  useEffect(() => {
    const initializeFromURL = async () => {
      setLoading(true);
      
      if (!selectedTopic && topicsData.length > 0) {
        const firstTopic = topicsData[0].id;
        const topicFiles = await loadFiles(firstTopic);
        setFiles(topicFiles);
        setSelectedTopic(firstTopic);
        setExpandedTopics({ [firstTopic]: true });
        setCurrentFileIndex(0);
      }
      setLoading(false);
    };
    
    initializeFromURL();
  }, []);

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
    
    setLoading(false);
  };

  const handleFileClick = (index) => {
    setCurrentFileIndex(index);
    setSidebarOpen(false);
  };

  const handleNext = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1);
    }
  };

  const currentFile = files[currentFileIndex];
  const currentTopicData = topicsData.find(t => t.id === selectedTopic);
  const commentKey = `${selectedTopic}-${currentFileIndex}`;
  const currentComments = comments[commentKey] || [];

  // Render content based on file type
  const renderContent = (content, type) => {
    if (type === 'md') {
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
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else if (type === 'pdf') {
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
              {/* Search Bar */}
              <div className="mb-6">
                <div className={`relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl transition-all outline-none ${
                      darkMode 
                        ? 'bg-white/10 border border-white/20 focus:border-purple-500 placeholder-gray-400' 
                        : 'bg-white border border-gray-300 focus:border-blue-500 placeholder-gray-500'
                    }`}
                  />
                </div>
                {searchQuery && (
                  <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Found {filteredTopics.length} topic(s)
                  </p>
                )}
              </div>

              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Topics
              </h2>
              
              {/* Topics Tree */}
              <div className="space-y-3">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => {
                    const Icon = topic.icon;
                    const isExpanded = expandedTopics[topic.id];
                    const isActive = selectedTopic === topic.id;
                    const topicFiles = isActive ? files : [];
                    
                    return (
                      <div key={topic.id} className="relative">
                        {isExpanded && topicFiles.length > 0 && (
                          <div className={`absolute left-6 top-12 bottom-0 w-px ${
                            darkMode ? 'bg-gradient-to-b from-purple-500/50 to-transparent' : 'bg-gradient-to-b from-blue-500/50 to-transparent'
                          }`} style={{ height: `${topicFiles.length * 3}rem` }} />
                        )}
                        
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
                        
                        {isExpanded && topicFiles.length > 0 && (
                          <div className="mt-2 ml-6 space-y-2">
                            {topicFiles.map((file, index) => {
                              const isFileActive = currentFileIndex === index && selectedTopic === topic.id;
                              
                              return (
                                <div key={index} className="relative">
                                  <div className={`absolute left-0 top-5 w-4 h-px ${
                                    darkMode ? 'bg-purple-500/50' : 'bg-blue-500/50'
                                  }`} />
                                  
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
                  })
                ) : (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Search size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No topics found</p>
                  </div>
                )}
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
                  <div className={`flex items-center justify-between gap-2 text-sm mb-8 pb-4 border-b ${
                    darkMode ? 'text-gray-400 border-white/10' : 'text-gray-600 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>{currentTopicData.name}</span>
                      <ChevronRight size={16} />
                      <span className={`capitalize ${darkMode ? 'text-purple-400' : 'text-blue-600'}`}>
                        {currentFile.name}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setShowComments(!showComments)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        darkMode 
                          ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' 
                          : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600'
                      }`}
                    >
                      <MessageCircle size={18} />
                      <span className="font-medium">Comments ({currentComments.length})</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`prose max-w-none mb-12 ${darkMode ? 'prose-invert' : ''}`}>
                    {renderContent(currentFile.content, currentFile.type)}
                  </div>

                  {/* Comments Section */}
                  {showComments && (
                    <div className={`mb-12 p-6 rounded-xl border ${
                      darkMode 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        <MessageCircle size={24} />
                        Comments
                      </h3>

                      {/* Comment Form */}
                      <div className={`mb-8 p-4 rounded-lg ${
                        darkMode ? 'bg-white/5' : 'bg-white'
                      }`}>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className={`w-full mb-3 px-4 py-2 rounded-lg transition-all outline-none ${
                            darkMode 
                              ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                          }`}
                        />
                        <textarea
                          placeholder="Write your comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-lg transition-all outline-none resize-none ${
                            darkMode 
                              ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-purple-500' 
                              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                          }`}
                        />
                        <button
                          onClick={postComment}
                          disabled={commentLoading}
                          className={`mt-3 flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                            commentLoading
                              ? darkMode
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : darkMode
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                          }`}
                        >
                          <Send size={18} />
                          {commentLoading ? 'Posting...' : 'Post Comment'}
                        </button>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {currentComments.length > 0 ? (
                          currentComments.map((comment) => (
                            <div
                              key={comment.id}
                              className={`p-4 rounded-lg transition-all ${
                                darkMode 
                                  ? 'bg-white/5 hover:bg-white/10' 
                                  : 'bg-white hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${
                                  darkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'
                                }`}>
                                  <User size={20} className={darkMode ? 'text-purple-400' : 'text-blue-600'} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {comment.userName}
                                    </span>
                                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {new Date(comment.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                    {comment.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <MessageCircle size={48} className="mx-auto mb-3 opacity-50" />
                            <p>No comments yet. Be the first to comment!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

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