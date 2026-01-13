import React from 'react';

export const AboutPage = ({ isDark }) => {
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';

  return (
    <div className={`p-6 ${textClass}`}>
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="mt-4">This is the about page of my portfolio.</p>
      {/* Add more content as needed */}
    </div>
  );
};
