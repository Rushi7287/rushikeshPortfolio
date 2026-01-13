import React from 'react';

export const MarkdownRenderer = ({ content, isDark }) => {
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';
  
  const lines = content.split('\n');
  return (
    <div className="space-y-4">
      {lines.map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className={`text-3xl font-bold ${textClass} mt-6`}>{line.slice(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={i} className={`text-2xl font-semibold ${textClass} mt-4`}>{line.slice(3)}</h2>;
        } else if (line.startsWith('```')) {
          return null;
        } else if (line.startsWith('- ')) {
          return <li key={i} className={`${textSecondaryClass} ml-6`}>{line.slice(2)}</li>;
        } else if (line.trim()) {
          return <p key={i} className={`${textSecondaryClass} leading-relaxed`}>{line}</p>;
        }
        return <br key={i} />;
      })}
    </div>
  );
};