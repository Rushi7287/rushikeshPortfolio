import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { getMdFilesForTopic } from '../utils/mdParser';
import { mdFiles } from '../md';
import { learningData } from '../data/learning';

export const LearningDetailPage = ({ isDark }) => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [topic, setTopic] = useState(null);

  const glassClass = isDark 
    ? 'bg-gray-800/40 backdrop-blur-lg border border-gray-700/50' 
    : 'bg-white/40 backdrop-blur-lg border border-white/50';
  const textClass = isDark ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  useEffect(() => {
    const found = learningData.find(t => String(t.id) === String(topicId));
    setTopic(found || null);
    if (found) {
      const mdFilesList = getMdFilesForTopic(found.folder, mdFiles);
      setFiles(mdFilesList);
      if (mdFilesList.length > 0) setSelectedFile(mdFilesList[0]);
    }
  }, [topicId]);

  if (!topic) {
    return (
      <div className={`text-center py-20 ${textSecondaryClass}`}>
        <p className="text-xl">Topic not found</p>
        <button onClick={() => navigate('/learning')} className={`mt-6 px-4 py-2 rounded-lg ${glassClass}`}>Back to topics</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className={`${glassClass} rounded-2xl p-6 shadow-lg lg:col-span-1 h-fit`}>
        <button
          onClick={() => navigate('/learning')}
          className={`flex items-center gap-2 ${textSecondaryClass} hover:${textClass} mb-6 transition-colors`}
        >
          ← Back to Topics
        </button>
        <h3 className={`text-xl font-bold mb-4 ${textClass}`}>{topic.name}</h3>
        <div className="space-y-2">
          {files.map(file => (
            <button
              key={file.key}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${
                selectedFile?.key === file.key
                  ? (isDark ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-200/60 text-purple-700')
                  : `${textSecondaryClass} hover:${isDark ? 'bg-gray-700/50' : 'bg-white/60'}`
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`${glassClass} rounded-2xl p-8 shadow-lg lg:col-span-3`}>
        {selectedFile ? (
          <MarkdownRenderer content={selectedFile.content} isDark={isDark} />
        ) : (
          <div className={`text-center py-20 ${textSecondaryClass}`}>
            <p className="text-xl">No content available</p>
          </div>
        )}
      </div>
    </div>
  );
};