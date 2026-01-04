export const sortByDate = <T>(
  items: T[],
  getDate: (item: T) => string | Date,
  descending = true,
): T[] => {
  return [...items].sort((a, b) => {
    const timeA = new Date(getDate(a)).getTime();
    const timeB = new Date(getDate(b)).getTime();

    return descending ? timeB - timeA : timeA - timeB;
  });
};
