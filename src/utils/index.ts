export const getTimeStamp = (): number => new Date().getTime();
export const getISOStringDate = (): string => new Date().toISOString();
export const getBearer = (authorization?: string): string | null => {
  const authHeader: string = authorization?.toString() || "";
  return authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
};
