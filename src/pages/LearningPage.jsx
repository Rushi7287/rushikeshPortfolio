import React from 'react';
import { LearningCard } from '../components/LearningCard';
import { learningData } from '../data/learning';
import { LinkAdapter } from '../components/LinkAdapter';

export const LearningPage = ({ isDark }) => {
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-8 ${textClass}`}>Learning Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningData.map(topic => (
          <LinkAdapter key={topic.id} to={`/learning/${topic.id}`} className="block">
            <LearningCard 
              topic={topic} 
              isDark={isDark}
            />
          </LinkAdapter>
        ))}
      </div>
    </div>
  );
};