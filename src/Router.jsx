const Router = ({ isDark }) => {
  const [currentRoute, setCurrentRoute] = useState('projects');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToLearning = () => {
    setSelectedTopic(null);
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    setSelectedTopic(null);
  };

  // Render current page
  if (currentRoute === 'projects') {
    return <ProjectsPage isDark={isDark} />;
  }

  if (currentRoute === 'learning') {
    if (selectedTopic) {
      return (
        <LearningDetailPage 
          topic={selectedTopic} 
          isDark={isDark}
          onBack={handleBackToLearning}
        />
      );
    }
    return <LearningPage isDark={isDark} onTopicSelect={handleTopicSelect} />;
  }

  return null;
};