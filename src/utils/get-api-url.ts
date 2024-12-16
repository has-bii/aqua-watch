export const getApiUrl = (endpoint: string): string => {
  if (import.meta.env.PROD) return endpoint;

  return `${import.meta.env.VITE_API_URL}${endpoint}`;
};
