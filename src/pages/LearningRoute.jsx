import React, { useState, useEffect, useRef, memo } from 'react';
import { FileText, ChevronLeft, ChevronRight, Menu, X, ChevronDown, BookOpen, Code, Zap, Database, Search, Palette } from 'lucide-react';
import './LearningRoute.css';

// Memoized components for better performance
const TopicCard = memo(({ topic, isActive, isExpanded, files, onTopicClick, onFileClick, currentFileIndex, selectedTopic }) => {
  const Icon = topic.icon;
  
  return (
    <div className="topic-container">
      {isExpanded && files.length > 0 && (
        <div className="topic-connector" style={{ height: `${files.length * 3}rem` }} />
      )}
      
      <div
        onClick={() => onTopicClick(topic.id)}
        className={`topic-card ${isActive ? 'active' : ''}`}
      >
        <div className="topic-content">
          <div className="topic-icon-wrapper">
            <Icon size={18} />
          </div>
          
          <div className="topic-details">
            <h3 className="topic-title">
              <span className="topic-name">{topic.name}</span>
              <div className={`chevron-icon ${isExpanded ? 'expanded' : ''}`}>
                <ChevronDown size={14} />
              </div>
            </h3>
            <p className="topic-description">{topic.description}</p>
          </div>
        </div>
        
        {!isActive && <div className="topic-hover-effect" />}
      </div>
      
      {isExpanded && files.length > 0 && (
        <div className="files-list">
          {files.map((file, index) => {
            const isFileActive = currentFileIndex === index && selectedTopic === topic.id;
            
            return (
              <div key={index} className="file-item-wrapper">
                <div className="file-connector-line" />
                <div className="file-connector-dot">
                  <Zap size={8} fill="currentColor" />
                </div>
                
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileClick(index);
                  }}
                  className={`file-item ${isFileActive ? 'active' : ''}`}
                >
                  <span className="file-rank">{file.rank}</span>
                  <span className="file-name">{file.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

// Topics data
const topicsData = [
  {
    id: '01_salesforce_architecture',
    name: 'Salesforce Architecture',
    description: 'Multitenancy, metadata, governor limits & environments',
    icon: Code
  },
  {
    id: '02_data_model',
    name: 'Data Model',
    description: 'Objects, fields, relationships & record types',
    icon: Code
  },
  {
    id: '03_apex_basics',
    name: 'Apex Basics',
    description: 'Variables, collections, methods & access modifiers',
    icon: Code
  },
  {
    id: '04_soql_sosl',
    name: 'SOQL & SOSL',
    description: 'Queries, relationships, aggregates & dynamic SOQL',
    icon: Code
  },
  {
    id: '05_triggers',
    name: 'Triggers',
    description: 'Trigger syntax, context variables, bulkification & frameworks',
    icon: Code
  },
  {
    id: '06_order_of_execution',
    name: 'Order of Execution',
    description: 'Save order, trigger & flow interaction',
    icon: Code
  },
  {
    id: '07_asynchronous_apex',
    name: 'Asynchronous Apex',
    description: 'Future, Queueable, Batch & Scheduled Apex',
    icon: Code
  },
  {
    id: '08_advanced_apex',
    name: 'Advanced Apex',
    description: 'DML methods, savepoints, mixed DML & dynamic Apex',
    icon: Code
  },
  {
    id: '09_configuration_support',
    name: 'Configuration Support',
    description: 'Custom metadata, custom settings & custom labels',
    icon: Code
  },
  {
    id: '10_testing',
    name: 'Testing',
    description: 'Test classes, async testing, mocking & data strategies',
    icon: Code
  },
  {
    id: '11_lightning_web_components',
    name: 'Lightning Web Components',
    description: 'LWC architecture, decorators, lifecycle & performance',
    icon: Code
  },
  {
    id: '12_aura_framework',
    name: 'Aura Framework',
    description: 'Component structure, events & communication model',
    icon: Code
  },
  {
    id: '13_visualforce',
    name: 'Visualforce',
    description: 'Controllers, extensions, view state & VF vs Lightning',
    icon: Code
  },
  {
    id: '14_flow',
    name: 'Flow',
    description: 'Record-triggered, screen & autolaunched flows',
    icon: Code
  },
  {
    id: '15_legacy_automation',
    name: 'Legacy Automation',
    description: 'Workflow rules, Process Builder & approval processes',
    icon: Code
  },
  {
    id: '16_api_fundamentals',
    name: 'API Fundamentals',
    description: 'REST API, SOAP API & Apex REST',
    icon: Code
  },
  {
    id: '17_callouts',
    name: 'Callouts',
    description: 'HTTP callouts, named credentials, OAuth & retry',
    icon: Code
  },
  {
    id: '18_event_based_integration',
    name: 'Event-Based Integration',
    description: 'Platform Events, Change Data Capture & ReplayId',
    icon: Code
  },
  {
    id: '19_integration_design_patterns',
    name: 'Integration Design Patterns',
    description: 'Request-response, fire & forget & middleware patterns',
    icon: Code
  },
  {
    id: '20_object_and_field_security',
    name: 'Object & Field Security',
    description: 'OWD, role hierarchy, sharing rules & FLS enforcement',
    icon: Code
  },
  {
    id: '21_user_management',
    name: 'User Management',
    description: 'Profiles, permission sets & external user licenses',
    icon: Code
  },
  {
    id: '22_experience_cloud_architecture',
    name: 'Experience Cloud Architecture',
    description: 'Community types, licenses & partner role structure',
    icon: Code
  },
  {
    id: '23_external_data_access',
    name: 'External Data Access',
    description: 'Sharing sets, share groups & guest user security',
    icon: Code
  },
  {
    id: '24_customization',
    name: 'Experience Cloud Customization',
    description: 'Experience Builder, CMS, login flows & self registration',
    icon: Code
  },
  {
    id: '25_salesforce_sites',
    name: 'Salesforce Sites',
    description: 'Public access settings, guest user security & page access',
    icon: Code
  },
  {
    id: '26_deployment_methods',
    name: 'Deployment Methods',
    description: 'Change sets, SFDX, Metadata API & packages',
    icon: Code
  },
  {
    id: '27_ci_cd',
    name: 'CI/CD',
    description: 'Version control & pipeline basics',
    icon: Code
  },
  {
    id: '28_large_data_volume',
    name: 'Large Data Volume',
    description: 'Selective queries, indexes, skinny tables & query plan',
    icon: Code
  },
  {
    id: '29_scenario_based_questions',
    name: 'Scenario-Based Questions',
    description: 'Real-world enterprise scenarios & debugging challenges',
    icon: Code
  },
  {
    id: '30_project_level_discussion',
    name: 'Project-Level Discussion',
    description: 'Architecture, integration, deployment & production strategies',
    icon: Code
  },
];

// File cache
const fileCache = new Map();

const loadFiles = async (topicId) => {
  if (fileCache.has(topicId)) {
    return fileCache.get(topicId);
  }
  
  sessionStorage.setItem('LSKey[c]page', 'react');
  try {
    const response = await fetch(`/rushikeshPortfolio/content/${topicId}/manifest.json`);
    if (!response.ok) {
      console.error(`Manifest not found for topic: ${topicId}`);
      return [];
    }
    
    const fileList = await response.json();
    
    const files = await Promise.all(
      fileList.map(async (fileName) => {
        const match = fileName.match(/^(\d+)_(.+)\.(md|html|pdf|jpg|jpeg|png|webp|txt)$/);
        if (!match) {
          console.warn(`Invalid filename format: ${fileName}`);
          return null;
        }
        
        const rank = parseInt(match[1]);
        const name = match[2].replace(/_/g, ' ');
        const type = match[3];
        
        if (['pdf', 'jpg', 'jpeg', 'png', 'webp'].includes(type)) {
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
    
    const sortedFiles = files.filter(Boolean).sort((a, b) => a.rank - b.rank);
    fileCache.set(topicId, sortedFiles);
    return sortedFiles;
  } catch (error) {
    console.error('Error loading files:', error);
    return [];
  }
};

// Content Renderer
const ContentRenderer = memo(({ content, type }) => {
  if (type === 'md') {
    const lines = content.split('\n');
    return (
      <div className="markdown-content">
        {lines.map((line, i) => {
          if (line.startsWith('# ')) {
            return <h1 key={i} className="md-h1">{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={i} className="md-h2">{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={i} className="md-h3">{line.substring(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return <li key={i} className="md-li">{line.substring(2)}</li>;
          } else if (line.trim() === '') {
            return <div key={i} className="md-spacer" />;
          } else if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <p key={i} className="md-p">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
              </p>
            );
          } else {
            return <p key={i} className="md-p">{line}</p>;
          }
        })}
      </div>
    );
  } else if (type === 'html') {
    return <div className="html-content" dangerouslySetInnerHTML={{ __html: content }} />;
  } else if (type === 'pdf') {
    return (
      <div className="pdf-viewer">
        <iframe 
          src={content} 
          className="pdf-iframe"
          title="PDF Viewer"
          loading="lazy"
        />
      </div>
    );
  } else if (['jpg', 'jpeg', 'png', 'webp'].includes(type)) {
    return (
      <div className="image-viewer">
        <img 
          src={content} 
          alt="Content" 
          className="content-image"
          loading="lazy"
        />
      </div>
    );
  } else if (type === 'txt') {
    return (
      <div className="text-content">
        <pre className="text-pre">{content}</pre>
      </div>
    );
  }
  return <div className="default-content">{content}</div>;
});

const LearningRoute = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(topicsData);
  const [backgroundTheme, setBackgroundTheme] = useState('blue'); // 'blue' or 'orange'
  
  const contentTopRef = useRef(null);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredTopics(topicsData);
      } else {
        const filtered = topicsData.filter(topic =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTopics(filtered);
      }
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const scrollToTop = () => {
    if (contentTopRef.current) {
      const headerHeight = 80;
      const elementPosition = contentTopRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTopicClick = async (topicId) => {
    const isCurrentlyExpanded = expandedTopics[topicId];
    const isNewTopic = selectedTopic !== topicId;
    
    // If it's a new topic or collapsing current topic
    if (isNewTopic || isCurrentlyExpanded) {
      // Toggle expansion
      setExpandedTopics(prev => ({
        ...prev,
        [topicId]: !prev[topicId]
      }));
    }
    
    // Load files for new topic or when expanding
    if (isNewTopic || !isCurrentlyExpanded) {
      setLoading(true);
      const topicFiles = await loadFiles(topicId);
      setFiles(topicFiles);
      setSelectedTopic(topicId);
      setCurrentFileIndex(null);
      setLoading(false);
      
      // Ensure it's marked as expanded
      setExpandedTopics(prev => ({
        ...prev,
        [topicId]: true
      }));
    }
  };

  const handleFileClick = (index) => {
    setCurrentFileIndex(index);
    setSidebarOpen(false);
    
    // Scroll to top after a brief delay to allow content to render
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleNext = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const handlePrev = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1);
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const toggleBackgroundTheme = () => {
    setBackgroundTheme(prev => prev === 'blue' ? 'orange' : 'blue');
  };

  const currentFile = currentFileIndex !== null ? files[currentFileIndex] : null;
  const currentTopicData = topicsData.find(t => t.id === selectedTopic);

  return (
    <div className={`learning-container theme-${backgroundTheme}`}>
      {/* Background */}
      <div className={`background-image ${backgroundTheme === 'blue' ? 'bg-blue' : 'bg-orange'}`} />
      
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="menu-button mobile-only"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="header-icon">
              <BookOpen size={24} />
            </div>
            
            <div className="header-text">
              <h1 className="header-title">My Learning Journey</h1>
              <p className="header-subtitle">Continuous growth through experience</p>
            </div>
          </div>
          
          <button
            onClick={toggleBackgroundTheme}
            className="theme-toggle-button"
            title={`Switch to ${backgroundTheme === 'blue' ? 'Orange' : 'Blue'} Theme`}
            aria-label="Toggle theme"
          >
            <Palette size={20} />
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="content-grid">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
              {/* Search Bar */}
              <div className="search-container">
                <div className="search-wrapper">
                  <Search className="search-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    aria-label="Search topics"
                  />
                </div>
                {searchQuery && (
                  <p className="search-results">
                    Found {filteredTopics.length} topic(s)
                  </p>
                )}
              </div>

              <h2 className="sidebar-title">Topics</h2>
              
              {/* Topics List */}
              <div className="topics-list">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      isActive={selectedTopic === topic.id}
                      isExpanded={expandedTopics[topic.id]}
                      files={selectedTopic === topic.id ? files : []}
                      onTopicClick={handleTopicClick}
                      onFileClick={handleFileClick}
                      currentFileIndex={currentFileIndex}
                      selectedTopic={selectedTopic}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <Search size={48} className="no-results-icon" />
                    <p className="no-results-text">No topics found</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="sidebar-overlay"
            />
          )}

          {/* Main Content */}
          <main className="main-content">
            <div ref={contentTopRef} className="content-card">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-icon">
                    <div className="spinner">
                      <BookOpen size={64} />
                    </div>
                  </div>
                  <p className="loading-text">Loading content...</p>
                </div>
              ) : currentFile && currentTopicData ? (
                <>
                  {/* Breadcrumb */}
                  <div className="breadcrumb">
                    <div className="breadcrumb-path">
                      <BookOpen size={14} />
                      <span className="breadcrumb-topic">{currentTopicData.name}</span>
                      <ChevronRight size={14} />
                      <span className="breadcrumb-file">{currentFile.name}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="content-body">
                    <ContentRenderer content={currentFile.content} type={currentFile.type} />
                  </div>

                  {/* Navigation */}
                  <div className="navigation">
                    <button
                      onClick={handlePrev}
                      disabled={currentFileIndex === 0 || files.length <= 1}
                      className="nav-button prev"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={18} />
                      <span className="nav-text">Previous</span>
                    </button>

                    <div className="page-indicator">
                      <span className="page-number">{currentFileIndex + 1} / {files.length}</span>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentFileIndex === files.length - 1 || files.length <= 1}
                      className="nav-button next"
                      aria-label="Next"
                    >
                      <span className="nav-text">Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              ) : selectedTopic && !currentFile ? (
                <div className="welcome-container">
                  <div className="welcome-icon">
                    <FileText size={64} />
                  </div>
                  <h3 className="welcome-title">Select a File</h3>
                  <p className="welcome-text">Choose a file from the sidebar to view its content</p>
                </div>
              ) : (
                <div className="welcome-container">
                  <div className="welcome-icon">
                    <FileText size={64} />
                  </div>
                  <h3 className="welcome-title">Welcome to My Learning Journey</h3>
                  <p className="welcome-text">Select a topic from the sidebar to begin exploring</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LearningRoute;