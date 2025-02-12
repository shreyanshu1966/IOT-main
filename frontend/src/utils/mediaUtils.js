const apiUrl = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${apiUrl}/uploads/${imagePath}`;
};

export const getDocumentUrl = (docPath) => {
  if (!docPath) return '';
  if (docPath.startsWith('http')) return docPath;
  return `${apiUrl}/documents/${docPath}`;
};