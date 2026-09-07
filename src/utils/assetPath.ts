export const getAssetPath = (path: string): string => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  // 1. Build-time basePath or configured basePath
  let base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // 2. Runtime browser fallback detection: if URL path starts with /Prabhusah
  if (!base && typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/Prabhusah")) {
      base = "/Prabhusah";
    }
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (base && cleanPath.startsWith(base)) {
    return cleanPath;
  }
  return `${base}${cleanPath}`;
};
