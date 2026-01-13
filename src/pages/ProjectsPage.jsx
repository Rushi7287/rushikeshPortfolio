import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projectsData } from '../data/projects';

export const ProjectsPage = ({ isDark }) => {
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-8 ${textClass}`}>My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};