import React from 'react';
import { images } from '../images';

export const ProjectCard = ({ project, isDark }) => {
  const glassClass = isDark 
    ? 'bg-gray-800/40 backdrop-blur-lg border border-gray-700/50' 
    : 'bg-white/40 backdrop-blur-lg border border-white/50';
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  const imageSrc = images[project.image] || project.image;

  return (
    <div className={`${glassClass} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
      <img src={imageSrc} alt={project.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${textClass}`}>{project.name}</h3>
        <p className={`${textSecondaryClass} mb-4 text-sm`}>{project.description}</p>
        <div className={`${isDark ? 'bg-gray-700/50' : 'bg-white/60'} rounded-lg p-3 mb-4`}>
          <p className={`text-xs font-semibold ${textSecondaryClass}`}>Tech Stack</p>
          <p className={`text-sm ${textClass}`}>{project.techDetails}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.hashtags.map((tag, i) => (
            <span key={i} className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-200/60 text-blue-700'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};