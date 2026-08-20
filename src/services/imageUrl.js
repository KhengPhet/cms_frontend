const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const SERVER_BASE = API_BASE.replace(/\/api\/?$/, "");

export const getImageUrl = (file) => {
  if (!file) return null;
  if (file.startsWith("http")) return file;
  if (file.startsWith("/uploads")) return `${SERVER_BASE}${file}`;
  return `${SERVER_BASE}/uploads/posts/${file}`;
};

export const getAuthorImageUrl = (file) => {
  if (!file) return null;
  if (file.startsWith("http")) return file;
  if (file.startsWith("/uploads")) return `${SERVER_BASE}${file}`;
  return `${SERVER_BASE}/uploads/${file}`;
};

export { SERVER_BASE };
