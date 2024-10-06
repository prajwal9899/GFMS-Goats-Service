/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculateDate = (input: any[]) => {
  const updatedArray = input.map((item: any) => {
    const match = item.Age.match(/(\d+)\s*year[s]?,?\s*(\d+)?\s*month[s]?/i);
    const [day, month, year] = item.PurchaseDate.split("/").map(Number);
    const baseDate = new Date(year, month - 1, day);
    if (match) {
      const years = parseInt(match[1]) || 0;
      const months = parseInt(match[2]) || 0;
      baseDate.setFullYear(baseDate.getFullYear() - years);
      baseDate.setMonth(baseDate.getMonth() - months);
    }
    return {
      ...item,
      DOB: baseDate,
    };
  });
  return updatedArray;
};
