export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) return true;

    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;

    const exp = payload.exp * 1000;

    return Date.now() >= exp - 30000;
  } catch {
    return true;
  }
};
