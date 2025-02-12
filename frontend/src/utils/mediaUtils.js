const apiUrl = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  // Remove any leading slash and clean up double slashes
  const cleanPath = imagePath.replace(/^\/+/, '').replace(/\/+/g, '/');
  return `${apiUrl}/uploads/${cleanPath}`;
};

export const getDocumentUrl = (docPath) => {
  if (!docPath) return '';
  if (docPath.startsWith('http')) return docPath;
  // Remove any leading slash and clean up double slashes
  const cleanPath = docPath.replace(/^\/+/, '').replace(/\/+/g, '/');
  return `${apiUrl}/documents/${cleanPath}`;
};