const apiUrl = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL with /uploads/, extract the filename
  if (imagePath.includes('/uploads/')) {
    const filename = imagePath.split('/uploads/').pop();
    return `${apiUrl}/uploads/${filename}`;
  }
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise, just use the filename
  return `${apiUrl}/uploads/${imagePath}`;
};

export const getDocumentUrl = (docPath) => {
  if (!docPath) return '';
  // If it's already a full URL with /documents/, extract the filename
  if (docPath.includes('/documents/')) {
    const filename = docPath.split('/documents/').pop();
    return `${apiUrl}/documents/${filename}`;
  }
  // If it's already a full URL, return as is
  if (docPath.startsWith('http')) return docPath;
  // Otherwise, just use the filename
  return `${apiUrl}/documents/${docPath}`;
};