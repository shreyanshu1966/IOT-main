const apiUrl = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // Clean up the path by removing any leading/duplicate slashes
  const cleanPath = imagePath.replace(/^\/+/, '').replace(/\/+/g, '/');
  
  // Construct the URL without double /uploads/
  return `${apiUrl}/uploads/${cleanPath}`;
};

export const getDocumentUrl = (docPath) => {
  if (!docPath) return '';
  if (docPath.startsWith('http')) return docPath;
  
  // Clean up the path by removing any leading/duplicate slashes
  const cleanPath = docPath.replace(/^\/+/, '').replace(/\/+/g, '/');
  
  // Construct the URL without double /documents/
  return `${apiUrl}/documents/${cleanPath}`;
};