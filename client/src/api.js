const RAW_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!RAW_BASE_URL) {
  throw new Error("❌ VITE_BACKEND_URL is not defined");
}

export const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");
