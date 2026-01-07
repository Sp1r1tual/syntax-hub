export const formatDateTime = (
  date: string | number | Date | null | undefined,
  locale: string = "uk-UA",
): string | null => {
  if (!date) return null;

  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return null;

  return d.toLocaleString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
