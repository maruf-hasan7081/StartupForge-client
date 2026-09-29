/** API base URL. In dev, default "" uses Vite proxy (see vite.config.js) to avoid CORS. */
export function getApiBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return "";
  return "http://localhost:5000";
}
