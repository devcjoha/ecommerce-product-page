export const generateYearOptions = (startYear: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const year = startYear + i;
    return (
      <option key={year} value={year}>
        {year}
      </option>
    );
  });
};