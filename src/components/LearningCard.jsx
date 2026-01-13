import React from 'react';

export const LearningCard = ({ topic, onClick, isDark }) => {
  const glassClass = isDark 
    ? 'bg-gray-800/40 backdrop-blur-lg border border-gray-700/50' 
    : 'bg-white/40 backdrop-blur-lg border border-white/50';
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <div 
      onClick={onClick}
      className={`${glassClass} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/30' : 'bg-purple-200/60'}`}>
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h3 className={`text-xl font-bold ${textClass}`}>{topic.name}</h3>
            <p className={`${textSecondaryClass} text-sm mt-1`}>{topic.description}</p>
          </div>
        </div>
        <span className={textSecondaryClass}>→</span>
      </div>
    </div>
  );
};