export const parseMdFileName = (fileName) => {
  const match = fileName.match(/^(\d+)_(.+)$/);
  return {
    order: match ? parseInt(match[1]) : 0,
    name: match ? match[2].replace(/_/g, ' ') : fileName.replace(/_/g, ' ')
  };
};

export const getMdFilesForTopic = (folder, mdFiles) => {
  const files = mdFiles[folder] || {};
  return Object.keys(files)
    .map(key => ({
      key,
      ...parseMdFileName(key),
      content: files[key]
    }))
    .sort((a, b) => a.order - b.order);
};